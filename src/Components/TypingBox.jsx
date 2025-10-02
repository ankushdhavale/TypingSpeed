import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate, count } from "random-words";
import { useTestMode } from "../context/TestModeContext";
import UpperMenu from "./UpperMenu";
import Stats from "./Stats";
const TypingBox = () => {
	const inputRef = useRef(null);
	const [wordArray, setWordArray] = useState(() => {
		return generate(50);
	});

	// const [wordArray, setWordArray] = useState(() => {
	// 	const wordCount = testTime === 15 ? 25 : testTime === 30 ? 40 : 60;
	// 	return generate(wordCount);
	// });
	const { testTime } = useTestMode();
	const [countDown, setCountDown] = useState(testTime);
	const [testStart, setTestStart] = useState(false);
	const [testEnd, setTestEnd] = useState(false);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [currCharIndex, setCurrCharIndex] = useState(0);
	const [correctChars, setCorrectChars] = useState(0);
	const [incorrectChars, setIncorrectChars] = useState(0);
	const [missedChars, setMissedChars] = useState(0);
	const [extraChars, setExtraChars] = useState(0);
	const [correctWords, setCorrectWords] = useState(0);
	const [graphData, setGraphData] = useState([]);

	const wordSpanRef = useMemo(() => {
		return Array(wordArray.length)
			.fill(0)
			.map((i) => createRef(null));
	}, [wordArray]);

	useEffect(() => {
		setCountDown(testTime);
	}, [testTime]);

	const startTimer = () => {
		const intervalID = setInterval(timer, 1000);
		function timer() {
			setCountDown((latestCountDown) => {
				setCorrectChars((correctChars) => {
					setGraphData((graphData) => {
						//graph data
						return [
							...graphData,
							[
								testTime - latestCountDown + 1,
								correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
							],
						];
					});
					return correctChars;
				});
				if (latestCountDown === 1) {
					setTestEnd(true);
					clearInterval(intervalID);
					return 0;
				}
				return latestCountDown - 1;
			});
		}
	};
	const handelUserInput = (e) => {
		if (!testStart) {
			startTimer();
			setTestStart(true);
		}

		// console.log(e.key);
		const allCurrChars = wordSpanRef[currWordIndex].current.childNodes;

		//logic for spaces
		if (e.keyCode === 32) {
			let correctCharsInWord = wordSpanRef[currWordIndex].current.querySelectorAll(".correct");
			console.log("hello",correctCharsInWord.length);
			console.log("gello",allCurrChars.length);


			if (correctCharsInWord.length === allCurrChars.length) {
				setCorrectWords((correctWords) => correctWords + 1);
				console.log("correct");
			}
			if (allCurrChars.length <= currCharIndex) {
				// remove cursor from last place in word
				allCurrChars[currCharIndex - 1].classList.remove("current-right");
			} else {
				//remove cursor from in between of the word
				allCurrChars[currCharIndex].classList.remove("current");
				setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
			}

			//add first character cursor of every first[0] character of word
			wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
				"current";
			setCurrWordIndex(currWordIndex + 1);
			setCurrCharIndex(0);
			return;
		}

		// Logic for backspace keycode = 8.
		if (e.keyCode === 8) {
			if (currCharIndex !== 0) {
				if (allCurrChars.length === currCharIndex) {
					//remove extra character
					if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
						allCurrChars[currCharIndex - 1].remove();
						allCurrChars[currCharIndex - 2].className += " current-right";
					} else {
						allCurrChars[currCharIndex - 1].className = "current";
					}
					setCurrCharIndex(currCharIndex - 1);
					return;
				}
				allCurrChars[currCharIndex].className = "";
				allCurrChars[currCharIndex - 1].className = "current";
				setCurrCharIndex(currCharIndex - 1);
			}
			return;
		}

		///wrong char add then that char also add in last of that word
		if (currCharIndex === allCurrChars.length) {
			let newSpan = document.createElement("span");
			newSpan.innerText = e.key;
			newSpan.className = "incorrect extra current-right ";
			allCurrChars[currCharIndex - 1].classList.remove("current-right");
			wordSpanRef[currWordIndex].current.append(newSpan);
			setCurrCharIndex(currCharIndex + 1);
			setExtraChars(extraChars + 1);
			return;
		}

		if (e.key === allCurrChars[currCharIndex].innerText) {
			allCurrChars[currCharIndex].className = "correct";
			setCorrectChars(correctChars + 1);
		} else {
			allCurrChars[currCharIndex].className = "incorrect";
			setIncorrectChars(incorrectChars + 1);
		}

		if (currCharIndex + 1 === allCurrChars.length) {
			allCurrChars[currCharIndex].className += " current-right";
		} else {
			allCurrChars[currCharIndex + 1].className = "current";
		}
		setCurrCharIndex(currCharIndex + 1);
	};

	//Calculate words per minute(WPM)
	const calculateWPM = () => {
		return Math.round(correctChars / 5 / (testTime / 60));
	};

	//calculate accuracy
	const calculateAccuracy = () => {
		const totalTyped = correctChars + incorrectChars + missedChars + extraChars;
		if (totalTyped === 0) return 0;
		return Math.ceil((correctWords / totalTyped) * 100);
	};

	const focusInput = () => {
		inputRef.current.focus();
	};

	useEffect(() => {
		focusInput();
		wordSpanRef[0].current.children[0].className = "current";
	}, []);

	const upperMenuDiv = useRef(null);

	useEffect(() => {
		if (testEnd && upperMenuDiv.current) { 
			upperMenuDiv.current.classList.add("blockDisplayUpperMenu");
		}
	}, [testEnd]);


	return (
		<div>
			{testEnd ? (
				<Stats
					wpm={calculateWPM()}
					accuracy={calculateAccuracy()}
					correctChars={correctChars}
					incorrectChars={incorrectChars}
					missedChars={missedChars}
					extraChars={extraChars}
					graphData={graphData}
				/>
			) : (
				<div>
					<UpperMenu countDown={countDown} />
					<div className='type-box' onClick={focusInput}>
						<div className='words'>
							{wordArray.map((word, index) => (
								<span className='word' ref={wordSpanRef[index]} key={index}>
									{word.split("").map((char, i) => (
										<span key={i}>{char}</span>
									))}
								</span>
							))}
						</div>
					</div>
				</div>
			)}
			<input
				type='text'
				ref={inputRef}
				className='hidden-input'
				onKeyDown={handelUserInput}
			/>
		</div>
	);
};

export default TypingBox;

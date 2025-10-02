import React, { useState } from "react";
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";
import Select from "react-select";
import { themeOptions } from "../Utils/ThemeOptions";
import { useTheme } from "../context/ThemeContext";

const FooterMenu = () => {
	const { theme, setTheme } = useTheme();
	const handleChange = (e) => {
		setTheme(e.value);
		localStorage.setItem("theme", JSON.stringify(e.value));
	};

	return (
		<div className='footer-menu'>
			<div className='socials-media'>
				<a href="https://leetcode.com/u/dhavaleankush7/" target="_"><SiLeetcode /></a>
				<a href="https://github.com/ankushdhavale" target="_"><IoLogoGithub /></a>
				<a href="https://www.linkedin.com/in/ankush-dhavale-5aa76b213/" target="_"><IoLogoLinkedin /></a>
			</div>
			<div className='themes'>
				<Select
					className="selectOption"
					onChange={handleChange}
					options={themeOptions}
					menuPlacement='top'
					defaultValue={{ label: theme.label, value: theme }}
					styles={{
						control: (styles) => ({
							...styles,
							backgroundColor: theme.background,
							width: 120,
							color:theme.textColor
						}),
						menu: (styles) => ({
							...styles,
							backgroundColor: theme.background,
							color:theme.textColor
						}),
						option: (styles, { isFocused }) => {
							return {
								...styles,
								backgroundColor: !isFocused
									? theme.background
									: theme.textColor,
								color: !isFocused ? theme.textColor : theme.background,
								cursor: "pointer",
							};
						},
					}}
				/>
			</div>
		</div>
	);
};

export default FooterMenu;

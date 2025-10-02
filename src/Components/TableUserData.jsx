import {
	TableBody,
    TableCell,
    Table,
	TableContainer,
	TableHead,
	TableRow,
    useTheme,
} from "@mui/material";
import React from "react";

const TableUserData = ({ data }) => {
	// console.log("user data",data);
    
    const { theme } = useTheme();
    // console.log(theme.textColor);
    const cellStyle = { color:'white', textAlign:'center'};
    return (
		<div className='table'>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
                            <TableCell style={cellStyle}>
                                WPM
                            </TableCell>
                            <TableCell style={cellStyle}>
                                Accuracy
                            </TableCell>
                            <TableCell style={cellStyle}>
                                Characters
                            </TableCell>
                            <TableCell style={cellStyle}>
                                Date
                            </TableCell>
						</TableRow>
					</TableHead>
                    <TableBody>
                        {
                            data.map((i,index) => (
                                <TableRow key={index}>
                                    <TableCell style={cellStyle}>{i.wpm}</TableCell>
                                    <TableCell style={cellStyle}>{i.accuracy}</TableCell>
                                    <TableCell style={cellStyle}>{i.characters}</TableCell>
                                    <TableCell style={cellStyle}>{i.timeStamp.toDate().toLocaleString()} </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default TableUserData;

// import React from 'react';
// import style from './Cell.module.scss'
// const Cell = ({data, updateBoard, flagCell}) => {
//     // const style = {
//     //     block: {
//     //
//     //         color: numColorCode(data.value),
//     //
//     //
//     //         background: data.revealed
//     //             ? data.value === "X"
//     //                 ? 'red'
//     //                 : bombChexPattern(data.x, data.y)
//     //             : chexPattern(data.x, data.y),
//     //     },
//     // };
//     const onClickUpdate = (e) => {
//         if (data.flagged) {
//             return;
//         }
//         console.log(e.type);
//         updateBoard(data.x, data.y);
//     };
//
//     const onClickFlag = (e) => {
//         e.preventDefault();
//         flagCell(data.x, data.y);
//     };
//
//     return (
//         <div
//             className={style.cell}
//             onClick={(e) => onClickUpdate(e)}
//             onContextMenu={(e) => onClickFlag(e)}
//         >
//             {data.flagged && !data.revealed ? (
//                 "🚩"
//             ) : data.revealed && data.value !== 0 ? (
//                 data.value === "X" ? (
//                     'Xxx'
//                 ) : (
//                     data.value
//                 )
//             ) : (
//                 ""
//             )}
//         </div>
//     );
// }
//
// const chexPattern = (x, y) => {
//     if (x % 2 === 0 && y % 2 === 0) {
//         return "#aad751";
//     } else if (x % 2 === 0 && y % 2 !== 0) {
//         return "#a2d249";
//     } else if (x % 2 !== 0 && y % 2 === 0) {
//         return "#a2d249";
//     } else {
//         return "#aad751";
//     }
// };
//
// const bombChexPattern = (x, y) => {
//     if (x % 2 === 0 && y % 2 === 0) {
//         return "#e5c29f";
//     } else if (x % 2 === 0 && y % 2 !== 0) {
//         return "#d7b899";
//     } else if (x % 2 !== 0 && y % 2 === 0) {
//         return "#d7b899";
//     } else {
//         return "#e5c29f";
//     }
// };
//
// const numColorCode = (num) => {
//     if (num === 1) {
//         return "#1976d2";
//     } else if (num === 2) {
//         return "#388d3c";
//     } else if (num === 3) {
//         return "#d33030";
//     } else if (num === 4) {
//         return "#7c21a2";
//     } else if (num === 5) {
//         return "#1976d2";
//     } else if (num === 6) {
//         return "#1976d2";
//     } else {
//         return "white";
//     }
// };
//
// export default Cell;


import React from 'react';
import style from './Cell.module.scss'

const Cell = ({data, x, y, updateBoard, flagCell}) => {
    const {revealed, value, flagged} = data;

    const handleClick = (e) => {
        if (e.button === 0 && !flagged) { // left click
            updateBoard(x, y, e);
        } else if (e.button === 2) { // right click
            flagCell(x, y);
        }
    };

    const numColorCode = (num) => {
        switch (num) {
            case 1:
                return "#1976d2";
            case 2:
                return "#388d3c";
            case 3:
                return "#d33030";
            case 4:
                return "#051075";
            case 5:
                return "#835b06";
            case 6:
                return "#04e0cb";
            case 7:
                return "#000000";
            case 8:
                return "#ffffff";
            default:
                return;
        }
    };


    return (
        <div
            className={`${style.cell} ${revealed ? style.cell_revealed : ''} ${flagged ? style.cell_flagged : ''}`}
            style={{color: numColorCode(value)}}
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}
        >
            {revealed ? (value === "X" ? "v" : value === 0 ? "" : value) : null}
        </div>
    );
};

export default Cell;
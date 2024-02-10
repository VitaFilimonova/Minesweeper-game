import React from 'react';
import style from "./LeadersTab.module.scss";

const LeadersTab = ({open, setOpen}) => {
    return (
        <div className={`${style.leaders__tab} ${open ? style.leaders__tab_open : ''}`}>
            <div className={style.leaders__content}>
                <button className={style.leaders__tab_close} onClick={() => setOpen(false)}>&#215;</button>
                <h2 className={style.leaders__header}>Leaderboard</h2>

            </div>
        </div>
    );
};

export default LeadersTab;
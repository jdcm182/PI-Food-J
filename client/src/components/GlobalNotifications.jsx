import React from 'react';
import style from './GlobalNotifications.module.css';

export default function GlobalNotifications() {

    return (
        <div>
            <div className={style.glass}>
                <div className={style.wrapper}>
                    <div className={style.centerBox}>
                        <div className={style.closeBtn}>X</div>
                        <div className={style.msgBody}>
                            GLOBAL NOTIFICATIONS COMPONENT
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.transparent}>
                <div className={style.bottomBox}>
                    <div className={style.closeBtn}>X</div>
                    <div className={style.msgBody}>Bottom</div>
                </div>
            </div>
        </div>
    )
}
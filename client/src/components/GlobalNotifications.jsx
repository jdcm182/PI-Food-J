import React from 'react';
import style from './GlobalNotifications.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { dismissMessages } from '../actions';

export default function GlobalNotifications() {

    const errorMsg = useSelector((state) => state.errorMsg);
    const infoMsg = useSelector((state) => state.infoMsg);

    const dispatch = useDispatch();


    const closeInfo = () => {
        //console.log('closeInfo')
        console.log('closeInfo..')
        dispatch(dismissMessages())
        // errorMsg = '';
        // infoMsg = '';
    }

    return (
        <div>
            {errorMsg && <div className={style.glass}>
                <div className={style.wrapper}>
                    <div className={style.centerBox}>
                        <div className={style.closeBtn} onClick={closeInfo}>X</div>
                        <div className={style.msgBody}>
                            {/* GLOBAL NOTIFICATIONS COMPONENT */}
                            {/* errorMsg */}
                            {<span dangerouslySetInnerHTML={{ __html: errorMsg }} />}
                        </div>
                    </div>
                </div>
            </div>}
            {infoMsg && <div className={style.transparent}>
                <div className={style.bottomBox}>
                    <div className={style.closeBtn} onClick={() => closeInfo()}>X</div>
                    <div className={style.msgBody}>
                        {/* Bottom */}
                        {infoMsg}
                    </div>
                </div>
            </div>}
        </div>
    )

}
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getlanguagefromlocalstorage, setlanguagetolocalstorage } from '../utils/storage';
import useSRC from '../hooks/useSRC';
function Headmain(props) {
    const setType = props.setType
    const setUpdate=props.setUpdate
    const [state, setState] = useState(true)
    const [lan, setlan] = useState(getlanguagefromlocalstorage())
    // const [src,setsrc]=useSRC()
    const { t, i18n } = useTranslation()
    function editSrc(e){
        // setsrc(e.target.value)
        localStorage.setItem("src",e.target.value)
        setUpdate(e.target.value)
    }
    function handleselect(e) {
        console.log(e.target.value)
        i18n.changeLanguage(e.target.value)
        setlanguagetolocalstorage(e.target.value)
        setlan(e.target.value)
    }

    useEffect(() => {
        const language = getlanguagefromlocalstorage()
        i18n.changeLanguage(language)
    }, [])

    return (
        <div style={{ backgroundColor: '#d8d8d8', textAlign: "center" }} className="headMain">
            <div className="header-nav">
                <ul>
                    <input onChange={editSrc} type="text" placeholder={t("QidiruvHeaderMain")} className='mainHeadInput' />
                    <button className={("btnhead", state ? "activbtnmain" : "")} onClick={() => {
                        setState(true)
                        setType("topdim")
                    }}>{t("Topilmalar")}</button>
                    <button className={("btnhead", !state ? "activbtnmain" : "")} onClick={() => {
                        setState(false)
                        setType("yoqotdim")
                    }
                    }>{t("Yoqotmalar")}</button>
                    <select name="" id="" onChange={handleselect} value={lan}>
                        <option value="uz">uz</option>
                        <option value="en">en</option>
                        <option value="ru">ru</option>
                    </select>
                </ul>
            </div>
        </div>
    );
}

export default Headmain;
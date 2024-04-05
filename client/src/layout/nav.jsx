import { Translation, useTranslation } from "react-i18next";
import { Button } from "antd";
function Nav() {
    const {t}=useTranslation()
    return (
        <div className="Nav">
            <form action="">
                <select name="type" id="cars">
                    <option value="1">{t("Hudud")}</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                
                
                <input style={{marginTop: 20}} type="text" name="" id="" placeholder={t("Vaqtdan")}/>
                <input style={{marginTop: 20}} type="text" name="" id="" placeholder={t("Vaqtgacha")}/>
                <Button type="primary" style={{backgroundColor: '#a3b7f4', border: 'none', marginTop: 20}}>{t("Filtrlash")}</Button>
            </form>
        </div>
    );
}

export default Nav;

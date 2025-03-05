import Style_Container from "@/app/css/container/page.module.css";
import Style_Container_design from "@/app/css/container/design/page.module.css";

import Text_Position from "@/app/css/position/text/page.module.css";


export default function() {
    return (
        <div className={`${Style_Container.default} ${Style_Container_design.default}`}>
            <h1 className={Text_Position.center}>ダウンロード</h1>
        </div>
    )
}
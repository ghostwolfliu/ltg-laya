/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import LTG_UI_view_mygame from "./LTG_UI_view_mygame";

export default class LTG_UI_MyGame extends fgui.GComponent {

	public m_img_bg:fgui.GGraph;
	public m_view:LTG_UI_view_mygame;

	public static URL:string = "ui://hbq27te38gel1k";

	public static createInstance():LTG_UI_MyGame {
		return <LTG_UI_MyGame><any>(fgui.UIPackage.createObject("LTCom","MyGame"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.m_img_bg = <fgui.GGraph><any>(this.getChildAt(0));
		this.m_view = <LTG_UI_view_mygame><any>(this.getChildAt(1));
	}
}
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_view_set from "./UI_view_set";

export default class UI_CommonSet extends fgui.GComponent {

	public m_view:UI_view_set;
	public static URL:string = "ui://75kiu87kbg0023";

	public static createInstance():UI_CommonSet {
		return <UI_CommonSet>(fgui.UIPackage.createObject("LTGame", "CommonSet"));
	}

	protected onConstruct():void {
		this.m_view = <UI_view_set>(this.getChildAt(1));
	}
}
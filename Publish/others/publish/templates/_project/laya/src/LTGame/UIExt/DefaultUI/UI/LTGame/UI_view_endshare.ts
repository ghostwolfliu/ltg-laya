/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_btn_double_get from "./UI_btn_double_get";

export default class UI_view_endshare extends fgui.GComponent {

	public m_btn_share:UI_btn_double_get;
	public m_text_info:fgui.GTextField;
	public m_icon_reward:fgui.GLoader;
	public m_text_reward:fgui.GTextField;
	public m_btn_nothanks:fgui.GButton;
	public m_anim_enter:fgui.Transition;
	public static URL:string = "ui://75kiu87kbg0017";

	public static createInstance():UI_view_endshare {
		return <UI_view_endshare>(fgui.UIPackage.createObject("LTGame", "view_endshare"));
	}

	protected onConstruct():void {
		this.m_btn_share = <UI_btn_double_get>(this.getChildAt(2));
		this.m_text_info = <fgui.GTextField>(this.getChildAt(3));
		this.m_icon_reward = <fgui.GLoader>(this.getChildAt(4));
		this.m_text_reward = <fgui.GTextField>(this.getChildAt(5));
		this.m_btn_nothanks = <fgui.GButton>(this.getChildAt(6));
		this.m_anim_enter = this.getTransitionAt(0);
	}
}
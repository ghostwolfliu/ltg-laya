/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_btn_toggle_02 from "./UI_btn_toggle_02";
import UI_btn_double_get from "./UI_btn_double_get";

export default class UI_CommonEndReward extends fgui.GComponent {

	public m_btn_toggle_watchad:UI_btn_toggle_02;
	public m_text_str:fgui.GTextField;
	public m_btn_get:UI_btn_double_get;
	public m_icon_reward:fgui.GLoader;
	public m_text_add:fgui.GTextField;
	public m___bottomgames:fgui.GGraph;
	public m_anim_enter:fgui.Transition;
	public static URL:string = "ui://75kiu87kbg0019";

	public static createInstance():UI_CommonEndReward {
		return <UI_CommonEndReward>(fgui.UIPackage.createObject("LTGame", "CommonEndReward"));
	}

	protected onConstruct():void {
		this.m_btn_toggle_watchad = <UI_btn_toggle_02>(this.getChildAt(2));
		this.m_text_str = <fgui.GTextField>(this.getChildAt(3));
		this.m_btn_get = <UI_btn_double_get>(this.getChildAt(4));
		this.m_icon_reward = <fgui.GLoader>(this.getChildAt(5));
		this.m_text_add = <fgui.GTextField>(this.getChildAt(6));
		this.m___bottomgames = <fgui.GGraph>(this.getChildAt(7));
		this.m_anim_enter = this.getTransitionAt(0);
	}
}
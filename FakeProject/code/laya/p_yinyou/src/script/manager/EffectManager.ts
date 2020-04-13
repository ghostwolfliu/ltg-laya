import LTDictionary from "../../LTGame/LTUtils/LTDictionary";
import GlobalUnit from "../common/GlobalUnit";
import { EffectConfig } from "../config/EffectConfig";
import LTRes from "../../LTGame/Res/LTRes";
import Awaiters from "../../LTGame/Async/Awaiters";
import ArrayEx from "../../LTGame/LTUtils/ArrayEx";
import ResDefine from "../common/ResDefine";


export class EffectManager {

    public static get instance(): EffectManager {
        if (this._instance == null) {
            this._instance = new EffectManager();
        }
        return this._instance;
    }
    private static _instance: EffectManager;

    private _effectRoot: Laya.Sprite3D;
    private _effectMap: LTDictionary<number, Laya.Sprite3D>;
    private _continueEffects: Laya.Sprite3D[];

    private constructor() {
        this._Init();
    }

    private _Init() {
        this._effectRoot = new Laya.Sprite3D("EffectManager");
        GlobalUnit.s3d.addChild(this._effectRoot);

        this._effectMap = new LTDictionary<number, Laya.Sprite3D>();
        this._continueEffects = [];
    }

    public Preload(urls: string[]) {
        for (let i = 0; i < EffectConfig.dataList.length; ++i) {
            let configItem = EffectConfig.dataList[i];
            if (configItem.need_preload) {
                let effectPath = ResDefine.FixPath(configItem.model_path);
                urls.push(effectPath);
            }
        }
    }

    public async WarmEffects() {
        let preloadEffects: Laya.Sprite3D[] = [];
        for (let i = 0; i < EffectConfig.dataList.length; ++i) {
            let configItem = EffectConfig.dataList[i];
            if (configItem.need_preload) {
                let effectPath = ResDefine.FixPath(configItem.model_path);
                let effectObj = this._effectRoot.addChild(LTRes.Get(effectPath, true)) as Laya.Sprite3D;
                preloadEffects.push(effectObj);
                this._effectMap.set(configItem.id, effectObj);
            }
        }
        await Awaiters.NextFrame();
        for (let effectObj of preloadEffects) {
            effectObj.removeSelf();
        }
    }

    public StopEffectByIndex(index: number) {
        if (index == null) return;
        if (index < 0) return;
        if (index >= this._continueEffects.length) return;
        let effectObj = this._continueEffects[index];
        effectObj.destroy();
        ArrayEx.RemoveAt(this._continueEffects, index);
    }

    public async GetEffectObjById(effectId: number): Promise<Laya.Sprite3D> {
        let effectConfig = EffectConfig.data[effectId];
        if (effectConfig == null) {
            console.error("无效的特效id", effectId);
            return null;
        }
        let effectObj = this._effectMap.Get(effectId);
        if (effectObj == null) {
            let effectPath = ResDefine.FixPath(effectConfig.model_path);
            await LTRes.LoadAsync(effectPath);
            effectObj = LTRes.Get(effectPath);
            this._effectMap.set(effectConfig.id, effectObj);
        }
        let instEffect = effectObj.clone() as Laya.Sprite3D;
        return instEffect;
    }

    public async PlayEffectByData(showData: EffectShowData): Promise<number> {
        let instEffect = await this.GetEffectObjById(showData.effectId);
        if (showData.parent != null) {
            showData.parent.addChild(instEffect);
        } else {
            this._effectRoot.addChild(instEffect);
        }
        if (showData.setPos != null) {
            instEffect.transform.position = showData.setPos.clone();
        }
        if (showData.setRot != null) {
            instEffect.transform.rotation = showData.setRot.clone();
        }
        if (showData.setScale != null) {
            instEffect.transform.setWorldLossyScale(showData.setScale);
        }
        if (showData.continueTime) {
            await Awaiters.Seconds(showData.continueTime);
            instEffect.destroy();
        } else {
            this._continueEffects.push(instEffect);
            return this._continueEffects.length - 1;
        }
        return -1;
    }

    public async PlayEffectById(effectId: number, duringTime: number = 2, pos: Laya.Vector3 = null, rot: Laya.Quaternion = null): Promise<number> {
        let data = new EffectShowData(effectId);
        data.continueTime = duringTime;
        data.setPos = pos;
        data.setRot = rot;
        return this.PlayEffectByData(data);
    }

}

export class EffectShowData {

    /**
     * 特效id,必传
     */
    public effectId: number;
    /**
     * 特效持续时间
     */
    public continueTime: number = 2;
    /**
     * 设置位置,world
     */
    public setPos: Laya.Vector3 = null;
    /**
     * 设置旋转,world
     */
    public setRot: Laya.Quaternion = null;
    /**
     * 设置缩放,world
     */
    public setScale: Laya.Vector3 = null;
    /**
     * 创建父物体
     */
    public parent: Laya.Sprite3D = null;

    constructor(effectId: number) {
        this.effectId = effectId;
    }

}
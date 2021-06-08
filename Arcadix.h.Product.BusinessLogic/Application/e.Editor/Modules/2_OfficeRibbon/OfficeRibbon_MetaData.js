//In-line Images import
import CloseEditorImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/CloseEditor.svg?inline';
import CollapseImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/Collapse.svg?inline';
import ExpandImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/Expand.svg?inline';
import MinimizeImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/Minimize.svg?inline';

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
* */
export const GetImageMeta = () => {
    return {
        CloseEditorImage: CloseEditorImage,
        CollapseImage: CollapseImage,
        ExpandImage: ExpandImage,
        MinimizeImage: MinimizeImage
    }
}
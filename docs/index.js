import GxUi from '@src';

console.log(GxUi);
GxUi.AjaxHelper.get('/GxScript/Base.md').then(function(result){
    console.log(result);
});

export default GxUi;
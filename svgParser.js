function rgb2hex ( rgb = 'rgb(0,128,255)' ) {
	const r = parseInt(rgb.split(/,|\(|\)/g)[1]);
	const g = parseInt(rgb.split(/,|\(|\)/g)[2]);
	const b = parseInt(rgb.split(/,|\(|\)/g)[3]);
	return '#' + ('0'+r.toString(16)).slice( -2 ) + ('0'+g.toString(16)).slice( -2 ) + ('0'+b.toString(16)).slice( -2 );
}
function hex2rgb(hex = '#0080ff'){
    return 'rgb(' + parseInt(hex.slice(1,3), 16) + ',' + parseInt(hex.slice(3,5), 16) + ',' + parseInt(hex.slice(5,7), 16) + ')';
}
function parseSvg(id, svgData){
    document.getElementById(id).setAttribute('class', 'svgParser');
    let num = 0;
    const colorList = [];
    const regList = [
        /style="fill:rgb\([0-9|,|\s]+\)/g,
        /style="stop-color:rgb\([0-9|,|\s]+\)/g
    ];

    // bind
    let imgHtml = '<div id="svgParserImg" class="svgParserImg">';
    svgData.split(/(<[^>]*>)/).filter(s => s.length).forEach(elm => {
        for (let i = 0; i < regList.length; i++) {
            const reg = regList[i];
            if (elm.search(reg) == -1) continue;
            const rgb = elm.match(reg)[0];
            if (elm.match(/id="[^"]+"/g)) {
                embeddedId = elm.match(/id="[^"]+"/g)[0];
                elm = elm.replace(/id="[^"]+"/g, '');
            } else {
                embeddedId = `id="svgParser${num++}"`;
            }
            colorList.push({
                id: embeddedId.split('"')[1],
                color: rgb.match(/rgb\([0-9|,|\s]+\)/g)[0]
            });
            elm = elm.replace(reg, `${embeddedId} ${rgb}`);
            break;
        }
        imgHtml += elm;
    });
    imgHtml += '</div>';
    
    // picker
    let = pickerHtml = '<div class="svgParserPicker">';
    for (let i = 0; i < colorList.length; i++) {
        pickerHtml += `<input type="color" id="picker_${colorList[i].id}" value="${rgb2hex(colorList[i].color)}">`;
    }
    pickerHtml += '</div>';
    document.getElementById(id).innerHTML = pickerHtml + imgHtml;

    for (let i = 0; i < colorList.length; i++) {
        document.getElementById(`picker_${colorList[i].id}`).addEventListener('input', function(e){
            let style = document.getElementById(colorList[i].id).getAttribute('style');
            style = style.replace(/rgb\([0-9|,|\s]+\)/g, hex2rgb(e.target.value));
            document.getElementById(colorList[i].id).setAttribute('style', style);
        }, false);
        document.getElementById(`picker_${colorList[i].id}`).addEventListener('change', function(e){
            let style = document.getElementById(colorList[i].id).getAttribute('style');
            style = style.replace(/rgb\([0-9|,|\s]+\)/g, hex2rgb(e.target.value));
            document.getElementById(colorList[i].id).setAttribute('style', style);
        }, false);
    }
}

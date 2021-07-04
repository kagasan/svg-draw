window.onload = function(){
    this.parseSvg('img', imgData);

    document.getElementById("svgfile").addEventListener("change",function(e){
        const file = e.target.files;
        const reader = new FileReader();
        reader.readAsText(file[0]);
        reader.onload = function(ev){
            parseSvg('img', String(reader.result));
        }
    },false);
    document.getElementById("download").addEventListener("click", function(e){
        let blob = new Blob([document.getElementById('svgParserImg').innerHTML],{type:"text/plan"});
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'download.svg';
        link.click();
    }, false);
    
    
}
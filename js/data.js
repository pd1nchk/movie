function downloadData(contentType,data,filename){
	 
    var link=document.createElement("A");
    link.setAttribute("href",encodeURI("data:"+contentType+","+data));
    link.setAttribute("style","display:none");
    link.setAttribute("download",filename);
    document.body.appendChild(link); //needed for firefox
    console.log(link.outerHTML);
    link.click();
    setTimeout(function(){
        document.body.removeChild(link);
    },1000);
 }
 
 function fromToXml(form){
     var xmldata=['<?xml version="1.0"?>'];
       xmldata.push("<form>");
     var inputs=form.elements;
     for(var i=0;i<inputs.length;i++){
         var el=document.createElement("ELEMENT");
       if (inputs[i].name){
           el.setAttribute("name",inputs[i].name);
         el.setAttribute("value",inputs[i].value);
         el.setAttribute("id",inputs[i].id);
         xmldata.push(el.outerHTML);
       }
       
     }
     xmldata.push("</form>");
     return xmldata.join("\n");
 }
 
 
 function download(frm){
 
   var data=fromToXml(frm);
   console.log(data);
   
   downloadData("text/xml",data,"export.xml");
   
 }

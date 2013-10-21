// Constructor
function UtilsUrl()
{
}

UtilsUrl.prototype.CreateVarPart = function(jsonAttributes)
{
    var varPart = '';
    var separator = '?';
    $.each(jsonAttributes, function(name, value){
        varPart += separator + name + '=' + value;
        separator = '&';
    });
    return varPart;    
}
 
UtilsUrl.prototype.CreateUrl = function(siteUrl, jsonAttributes)
{
    var varPart = this.CreateVarPart(jsonAttributes);
    var url = siteUrl + varPart;
    return url;
}

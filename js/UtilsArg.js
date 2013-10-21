    // 
    // Constructor
    // 
function UtilsArg()
{
}

    // All Names
  

UtilsArg.prototype.Init = function(eventHandler, dataArg)
{
    this.eventHandler = eventHandler;
    this.dataArg = dataArg;
}
                         

UtilsArg.prototype.DisplayArg = function(jqueryIdArgText)
{
    var jsonData = this.dataArg.data;
    if (jsonData == null) return;
    
    // Set the argument text, which is stored in the json
    var argText = jsonData[this.dataArg.fieldNameArgText];
    $(jqueryIdArgText).html(argText);
}


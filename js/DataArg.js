// Constructor
function DataArg()
{
    // Depends on existence of global g_config
    
    this.utilsUrl = new UtilsUrl();
    
    this.data = null;
    this.loaded = false;
}

    // All Names
DataArg.prototype.eventNameArgLoaded = "ArgLoaded";

DataArg.prototype.fieldNameArgId = 'id_argument';
DataArg.prototype.fieldNameArgText = 'title';
DataArg.prototype.fieldNameRelationshipId = 'id_relationship';
DataArg.prototype.fieldNameParentId = 'id_parent';
DataArg.prototype.fieldNameChildId = 'id_child';


DataArg.prototype.Init = function(eventHandler)
{
    this.eventHandler = eventHandler;
}


    //
    // 
    // Interface
    // 
    // 


DataArg.prototype.LoadArg = function(argId, debugOutputId)
{
    // Reset loaded flag
    this.loaded = false;
    
    // Set the url variables in an array
    var urlVarArray = {id_argument:argId};
    
    // Create the url from the args
    var loadArgUrl = this.utilsUrl.CreateUrl(g_config.m_loadArgPhp, urlVarArray);
    
    // Debug output PhpRequestUrl
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, loadArgUrl);
    
    // Get json from Url with GET vars   
    var thisObject = this;
    $.get(loadArgUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        thisObject.data = jsonData;
        
        // Set flag and fire event
        thisObject.loaded = true;
        thisObject.eventHandler.fire(thisObject.eventNameArgLoaded);
        
        // Debug output PhpOutputText and json
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}

           
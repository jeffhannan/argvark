// Constructor
function DataArgList()
{
    // Depends on existence of global g_config
    
    this.utilsUrl = new UtilsUrl();
    
    this.data = null;
    this.lastPage = true;
    
    // Needed to help manage results of asynchronous requests.
    this.loaded = false;
}

    // All Names
DataArgList.prototype.eventNameArgListLoaded = "ArgListLoaded";
DataArgList.prototype.fieldNameTagId = 'id_tag';
DataArgList.prototype.fieldNameArgId = 'id_argument';
DataArgList.prototype.fieldNameTopicId = 'id_topic';
    //DataArgList.prototype.fieldNameArgTitle = 'argTitle';
DataArgList.prototype.fieldNameArgTitle = 'title';


DataArgList.prototype.Init = function(eventHandler)
{
    this.eventHandler = eventHandler;
}


    //
    // 
    // Interface
    // 
    // 



DataArgList.prototype.LoadArgList = function(topicId, topicName, argPageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loaded = false;
    
    var pageLength = g_config.m_noOfArgsToDisplay;

    // Set the args in an attribute array
    //urlVarArray = {id_topic:topicId, topic_name:topicName};
    urlVarArray = {id_topic:topicId, topic_name:topicName, page:argPageIndex, page_length:pageLength};
    
    // Create the url from the args
    var argListTableUrl = this.utilsUrl.CreateUrl(g_config.m_loadArgListPhp, urlVarArray);
    
    // Store this for use inside the callback - see Javascript Closure
    var thisObject = this;
    
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, argListTableUrl);
    $.get(argListTableUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        if (jsonData != null)
        {
            thisObject.data = jsonData['array_records'];
            var more = jsonData['more'];
            thisObject.lastPage = !more;
        }
        
        // Set flag and fire event
        thisObject.loaded = true;
        thisObject.eventHandler.fire(thisObject.eventNameArgListLoaded);
        
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}


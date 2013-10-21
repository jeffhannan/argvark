// Constructor
function DataArgTopics()
{
    // Depends on existence of global g_config
    
    this.utilsUrl = new UtilsUrl();
    
    this.data = null;
    this.lastPage = true;
    
    // Needed to help manage results of asynchronous requests.
    this.loaded = false;
    this.added = false;         
}

    // All Names
DataArgTopics.prototype.eventNameArgTopicsLoaded = "ArgTopicsLoaded";
DataArgTopics.prototype.eventNameArgTopicAdded = "ArgTopicAdded";
DataArgTopics.prototype.eventNameArgTopicSelected = "ArgTopicSelected";

DataArgTopics.prototype.fieldNameTagId = 'id_tag';
DataArgTopics.prototype.fieldNameArgumentId = 'id_argument';
DataArgTopics.prototype.fieldNameTopicId = 'id_topic';
DataArgTopics.prototype.fieldNameTopicName = 'name';


DataArgTopics.prototype.Init = function(eventHandler, navigation)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
}


    //
    // 
    // Server API
    // 
    // 



DataArgTopics.prototype.LoadArgTopics = function(argId, argTopicsPageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loaded = false;
    
    var pageLength = g_config.m_noOfArgTopicsToDisplay;

    // Set the url variables in an array
    //var urlVarArray = {user:g_config.m_userId, arg:argId};
    var urlVarArray = {id_argument:argId, page:argTopicsPageIndex, page_length:pageLength};
    
    // Create the url from the args
    var loadArgTopicsUrl = this.utilsUrl.CreateUrl(g_config.m_loadArgTopicsPhp, urlVarArray);
    
    // Debug output PhpRequestUrl
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, loadArgTopicsUrl);

    // Get json from Url with GET vars   
    var thisObject = this;    
    $.get(loadArgTopicsUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        //thisObject.data = jsonData;
        if (jsonData != null)
        {
            thisObject.data = jsonData['array_records'];
            var more = jsonData['more'];
            thisObject.lastPage = !more;
        }
        
        // Set flag and fire event
        thisObject.loaded = true;
        thisObject.eventHandler.fire(thisObject.eventNameArgTopicsLoaded);
        
        // Debug output PhpOutputText and json
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}
                                      
                                      
DataArgTopics.prototype.AddArgTopicTag = function(topicTagName, argId, debugOutputId)
{
    // Reset loaded flag
    this.added = false;
    
    // Set the url variables in an array
    //var urlVarArray = {id_argument:argId, argTopicName:topicTagName};
    var urlVarArray = {id_argument:argId, arg_topic_name:topicTagName};
    
    // Create the url from the args
    var addArgTopicUrl = this.utilsUrl.CreateUrl(g_config.m_addArgTopicPhp, urlVarArray);
    
    // Debug output PhpRequestUrl
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, addArgTopicUrl);
    
    // Get debug output text from Url with GET vars   
    var thisObject = this;
    $.get(addArgTopicUrl, function(text)
    {    
        // Set flag and fire event
        thisObject.added = true;
        thisObject.eventHandler.fire(thisObject.eventNameArgTopicAdded);
                                                              
        // Debug output PhpOutputText
        g_debug.DisplayPhpOutputPrefix(debugOutputId, text);
    });
}


DataArgTopics.prototype.SelectArgTopic = function(tagId, debugOutputId)
{
    // Set the topics in an attribute array
    var jsonPostData = {id_tag:tagId};
    
    // Send by POST
    g_debug.DisplayPostRequestPrefix(debugOutputId, g_config.m_selectArgTopicPhp, jsonPostData);
    $.post(g_config.m_selectArgTopicPhp, jsonPostData, function(text)
    {
        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(debugOutputId, text);
    });
}
 
DataArgTopics.prototype.SelectArgInTopic = function(topicName, argId, debugOutputId)
{
    // Set the topics in an attribute array
    var jsonPostData = {topic_name:topicName, id_argument:argId};
    
    // Send by POST           
    g_debug.DisplayPostRequestPrefix(debugOutputId, g_config.m_selectArgInTopicPhp, jsonPostData);
    $.post(g_config.m_selectArgInTopicPhp, jsonPostData, function(text)
    {
        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(debugOutputId, text);
    });
}
 



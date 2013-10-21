// Constructor
function DataTopicLinks()
{
    // Depends on existence of global g_config
    
    this.utilsUrl = new UtilsUrl();
    
    this.dataChild = null;
    this.dataParent = null;
    this.lastPageChild = true;
    this.lastPageParent = true;
    
    // Needed to help manage results of asynchronous requests.
    this.loadedChild = false;
    this.loadedParent = false;
}

    // All Names
DataTopicLinks.prototype.eventNameChildTopicLinksLoaded = "ChildTopicLinksLoaded";
DataTopicLinks.prototype.eventNameParentTopicLinksLoaded = "ParentTopicLinksLoaded";

DataTopicLinks.prototype.fieldNameTopicId = 'id_topic';
DataTopicLinks.prototype.fieldNameTopicName = 'name';
DataTopicLinks.prototype.fieldNameRelationshipId = 'id_relationship';
DataTopicLinks.prototype.fieldNameParentId = 'id_parent';
DataTopicLinks.prototype.fieldNameChildId = 'id_child';
DataTopicLinks.prototype.fieldNameSelectionCount = 'selection_count';


DataTopicLinks.prototype.Init = function(eventHandler)
{
    this.eventHandler = eventHandler;
}



    //
    // 
    // Interface
    // 
    // 



DataTopicLinks.prototype.LoadChildTopicLinks = function(topicId, topicName, pageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loadedChild = false;
    
    var pageLength = g_config.m_noOfChildTopicLinksToDisplay;
    
    // Set the topics in an attribute array
    urlVarArray = {id_topic:topicId, topic_name:topicName, link_direction:0, page:pageIndex, page_length:pageLength};
    
    // Create the url from the topics
    var topicLinksTableUrl = this.utilsUrl.CreateUrl(g_config.m_loadTopicLinksPhp, urlVarArray);
    
    // Store this for use inside the callback - see Javascript Closure
    var thisObject = this;
    
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, topicLinksTableUrl);
    $.get(topicLinksTableUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        //thisObject.dataChild = jsonData;
        if (jsonData != null)
        {
            thisObject.dataChild = jsonData['array_records'];
            var more = jsonData['more'];
            thisObject.lastPageChild = !more;
        }
                
        // Set flag and fire event
        thisObject.loadedChild = true;
        thisObject.eventHandler.fire(thisObject.eventNameChildTopicLinksLoaded);
        
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}


DataTopicLinks.prototype.LoadParentTopicLinks = function(topicId, topicName, pageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loadedParent = false;
    
    var pageLength = g_config.m_noOfParentTopicLinksToDisplay;

    // Set the topics in an attribute array
    urlVarArray = {id_topic:topicId, topic_name:topicName, link_direction:1, page:pageIndex, page_length:pageLength};
    
    // Create the url from the topics
    var topicLinksTableUrl = this.utilsUrl.CreateUrl(g_config.m_loadTopicLinksPhp, urlVarArray);
    
    // Store this for use inside the callback - see Javascript Closure
    var thisObject = this;
    
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, topicLinksTableUrl);
    $.get(topicLinksTableUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        //thisObject.dataParent = jsonData;
        if (jsonData != null)
        {
            thisObject.dataParent = jsonData['array_records'];
            var more = jsonData['more'];
            thisObject.lastPageParent = !more;
        }
         
        // Set flag and fire event
        thisObject.loadedParent = true;
        thisObject.eventHandler.fire(thisObject.eventNameParentTopicLinksLoaded);
        
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}

DataTopicLinks.prototype.SelectTopicLink = function(relationshipId, debugOutputId)
{
    // Set the topics in an attribute array
    var jsonPostData = {id_relationship:relationshipId};
    
    // Send by POST
    g_debug.DisplayPostRequestPrefix(debugOutputId, g_config.m_selectTopicLinkPhp, jsonPostData);
    $.post(g_config.m_selectTopicLinkPhp, jsonPostData, function(text)
    {
        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(debugOutputId, text);
    });
}


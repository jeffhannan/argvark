// Constructor
function DataTopic()
{
    // Depends on existence of global g_config
    
    this.utilsUrl = new UtilsUrl();
    
    this.data = null;
    this.loaded = false;
}

    // All Names
DataTopic.prototype.eventNameTopicLoaded = "TopicLoaded";

DataTopic.prototype.fieldNameTopicId = 'id_topic';
DataTopic.prototype.fieldNameTopicName = 'name';
    /*
DataTopic.prototype.fieldNameRelationshipId = 'id_relationship';
DataTopic.prototype.fieldNameParentId = 'id_parent';
DataTopic.prototype.fieldNameChildId = 'id_child';
DataTopic.prototype.fieldNameSelectionCount = 'selection_count';
*/


DataTopic.prototype.Init = function(eventHandler)
{
    this.eventHandler = eventHandler;
}


    //
    // 
    // Interface
    // 
    // 


DataTopic.prototype.LoadTopic = function(topicId, topicName, debugOutputId)
{
    // Reset loaded flag
    this.loaded = false;
    
    // Set the topics in an attribute array
    var urlVarArray = {id_topic:topicId, topic_name:topicName};
    
    // Create the url from the topics
    var topicTableUrl = this.utilsUrl.CreateUrl(g_config.m_loadTopicPhp, urlVarArray);
    
    // Store this for use inside the callback - see Javascript Closure
    var thisObject = this;
    
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, topicTableUrl);
    $.get(topicTableUrl, function(jsonCandidateText)
    {
        // Parse JSON and store it
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        thisObject.data = jsonData;
        
        // Set flag and fire event
        thisObject.loaded = true;
        thisObject.eventHandler.fire(thisObject.eventNameTopicLoaded);
        
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}

           
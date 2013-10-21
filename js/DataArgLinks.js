// Constructor
function DataArgLinks()
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
DataArgLinks.prototype.eventNameArgChildLinksLoaded = "ArgChildLinksLoaded";
DataArgLinks.prototype.eventNameArgParentLinksLoaded = "ArgParentLinksLoaded";

DataArgLinks.prototype.fieldNameRelationshipId = 'id_relationship';
DataArgLinks.prototype.fieldNameParentId = 'id_parent';
DataArgLinks.prototype.fieldNameChildId = 'id_child';
DataArgLinks.prototype.fieldNameArgTitle = 'title';
    /*
DataArgLinks.prototype.fieldNameParentArgTitle = 'parentArgTitle';
DataArgLinks.prototype.fieldNameChildArgTitle = 'childArgTitle';
      */

DataArgLinks.prototype.Init = function(eventHandler)
{
    this.eventHandler = eventHandler;
}


    //
    // 
    // Interface
    // 
    // 



DataArgLinks.prototype.LoadArgChildLinks = function(argId, pageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loadedChild = false;
    
    var pageLength = g_config.m_noOfChildArgLinksToDisplay;

    // Set the url variables in an array
    //var urlVarArray = {user:g_config.m_userId, arg:argId, linkDirection:0};
    var urlVarArray = {id_argument:argId, link_direction:0, page:pageIndex, page_length:pageLength};
    
    // Create the url from the args
    var loadArgLinksUrl = this.utilsUrl.CreateUrl(g_config.m_loadArgLinksPhp, urlVarArray);
    
    // Debug output PhpRequestUrl
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, loadArgLinksUrl);
    
    // Get json from Url with GET vars   
    var thisObject = this;
    $.get(loadArgLinksUrl, function(jsonCandidateText)
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
        thisObject.eventHandler.fire(thisObject.eventNameArgChildLinksLoaded);
        
        // Debug output PhpOutputText and json
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}


DataArgLinks.prototype.LoadArgParentLinks = function(argId, pageIndex, debugOutputId)
{
    // Reset loaded flag
    this.loadedParent = false;
    
    var pageLength = g_config.m_noOfParentArgLinksToDisplay;

    // Set the url variables in an array
    //var urlVarArray = {user:g_config.m_userId, arg:argId, linkDirection:1};
    var urlVarArray = {id_argument:argId, link_direction:1, page:pageIndex, page_length:pageLength};
    
    // Create the url from the args
    var loadArgLinksUrl = this.utilsUrl.CreateUrl(g_config.m_loadArgLinksPhp, urlVarArray);
    
    // Debug output PhpRequestUrl
    g_debug.DisplayPhpRequestUrlPrefix(debugOutputId, loadArgLinksUrl);
    
    // Get json from Url with GET vars   
    var thisObject = this;
    $.get(loadArgLinksUrl, function(jsonCandidateText)
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
        thisObject.eventHandler.fire(thisObject.eventNameArgParentLinksLoaded);
        
        // Debug output PhpOutputText and json
        g_debug.DisplayPhpOutputTextJsonPrefix(debugOutputId, jsonCandidateText, jsonData);
    });
}


DataArgLinks.prototype.SelectArgLink = function(relationshipId, debugOutputId)
{
    // Set the topics in an attribute array
    var jsonPostData = {id_relationship:relationshipId};
    
    // Send by POST
    g_debug.DisplayPostRequestPrefix(debugOutputId, g_config.m_selectArgLinkPhp, jsonPostData);
    $.post(g_config.m_selectArgLinkPhp, jsonPostData, function(text)
    {
        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(debugOutputId, text);
    });
}
 


    // 
    // Constructor
    // 
function UtilsTopicLinks()
{
    this.utilsHtml = new UtilsHtml();
    this.utilsUrl = new UtilsUrl();
    this.utilsPage = new UtilsPage();
    
    this.addTopicLinkHtmlLoaded = false;   
}

    // All Names
UtilsTopicLinks.prototype.elementNameTopicLink = "TopicLink";
UtilsTopicLinks.prototype.elementNameTopic = "Topic";
UtilsTopicLinks.prototype.jqueryIdAddTopicLinkGoButton = "#addTopicLinkGo";
UtilsTopicLinks.prototype.jqueryIdAddTopicLinkName = "#addTopicLinkName";
UtilsTopicLinks.prototype.jqueryIdAddChildTopicLinkName = "#addChildTopicLinkName";
UtilsTopicLinks.prototype.jqueryIdAddParentTopicLinkName = "#addParentTopicLinkName";
UtilsTopicLinks.prototype.textNewTab = "TopicNT";
UtilsTopicLinks.prototype.textThisTab = "TopicTT";
    //UtilsTopicLinks.prototype.eventNameAddTopicLinkLoaded = "AddTopicLinkLoaded";
UtilsTopicLinks.prototype.eventNameTopicLinkAdded = "TopicLinkAdded";
UtilsTopicLinks.prototype.eventNameTopicLinkClicked = "TopicLinkClicked";
UtilsTopicLinks.prototype.radioAddTopicLinkDirection = "RadioAddTopicLinkDirection";
UtilsTopicLinks.prototype.radioValueChild = "0";
UtilsTopicLinks.prototype.radioValueParent = "1";
                                            

UtilsTopicLinks.prototype.Init = function(eventHandler, navigation, dataTopicLinks)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
    this.dataTopicLinks = dataTopicLinks;
}
 
  

    // 
    // Bind
    //


UtilsTopicLinks.prototype.Bind = function(jsonData, elementsPrefix, linkDirection, debugOutputPrefixAddTopicLink)
{
    var thisObject = this;
    var addJQueryId = true;
    var addJQueryIdForElement = false;
    $.each(jsonData, function(index, entry){
        // Create the jQuery ids for each relationship entry, from the unique relationshipId
        // The functions ensure it matches up with the html
        var relationshipId = entry[thisObject.dataTopicLinks.fieldNameRelationshipId];
        var topicId = -1;
        var topicName = entry[thisObject.dataTopicLinks.fieldNameTopicName];
        if (linkDirection == 0)
        {
            topicId = entry[thisObject.dataTopicLinks.fieldNameChildId];
        }
        else
        {
            topicId = entry[thisObject.dataTopicLinks.fieldNameParentId];
        }
        var topicElementId = thisObject.CreateTopicElementId(topicId, addJQueryId, elementsPrefix);
        
        // Bind functions to the elements
        $(topicElementId).click(function(){thisObject.TopicLinkClicked(topicId, topicName, relationshipId);});
    });

    $(this.jqueryIdAddChildTopicLinkName).change(function(){thisObject.AddTopicLinkAsChild(debugOutputPrefixAddTopicLink);});
    $(this.jqueryIdAddParentTopicLinkName).change(function(){thisObject.AddTopicLinkAsParent(debugOutputPrefixAddTopicLink);});
}



UtilsTopicLinks.prototype.CreateTopicLinkElementId = function(relationshipId, addJQueryId, elementsPrefix)
{
    var topicLinkElementId = this.utilsHtml.CreateElementIdP(elementsPrefix, this.elementNameTopicLink, relationshipId, addJQueryId);
    return topicLinkElementId;
}



    // 
    // Event Handlers
    //

   // this should be in data
UtilsTopicLinks.prototype.AddTopicLink2 = function(linkTopicName, linkDirection, debugOutputPrefixAddTopicLink)
{                     
    var thisObject = this;                    

    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    // Create json data to send to update, by POST
    //jsonPostData = {id_topic:topicId, linkTopicName:linkTopicName, linkDirection:linkDirection};
    jsonPostData = {id_topic:topicId, topic_name:topicName, link_topic_name:linkTopicName, link_direction:linkDirection};
    // Send by POST
    g_debug.DisplayPostRequestPrefix(debugOutputPrefixAddTopicLink, g_config.m_addTopicLinkPhp, jsonPostData);
    $.post(g_config.m_addTopicLinkPhp, jsonPostData, function(text)
    {
        thisObject.eventHandler.fire(thisObject.eventNameTopicLinkAdded);

        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(debugOutputPrefixAddTopicLink, text);
    });
}

 
    // need a debug output thing here                   
UtilsTopicLinks.prototype.AddTopicLinkAsChild = function(debugOutputPrefixAddTopicLink)
{                     
    // Get the name of the topic to link to
    var linkTopicName = $(this.jqueryIdAddChildTopicLinkName).val();
    if (linkTopicName == "")
        return;
         
    this.AddTopicLink2(linkTopicName, 0, debugOutputPrefixAddTopicLink);
    $(this.jqueryIdAddChildTopicLinkName).val("");
}
UtilsTopicLinks.prototype.AddTopicLinkAsParent = function(debugOutputPrefixAddTopicLink)
{                     
    // Get the name of the topic to link to
    var linkTopicName = $(this.jqueryIdAddParentTopicLinkName).val();
    if (linkTopicName == "")
        return;
         
    this.AddTopicLink2(linkTopicName, 1, debugOutputPrefixAddTopicLink);
    $(this.jqueryIdAddParentTopicLinkName).val("");
}
 
 
UtilsTopicLinks.prototype.TopicLinkClicked = function(topicId, topicName, relationshipId)
{
    this.navigation.topicId = topicId;
    this.navigation.topicName = topicName;
    this.navigation.topicRelationshipId = relationshipId;
    this.eventHandler.fire(this.eventNameTopicLinkClicked);
}

    // 
    // Display
    //

UtilsTopicLinks.prototype.DisplayChildTopicLinksTable = function(jsonData, jqueryElementId, elementsPrefix)
{
    var htmlText = this.CreateChildTopicLinksTableHtml(jsonData, "Child Topics", this.dataTopicLinks.fieldNameChildId, jqueryElementId, elementsPrefix);
    $(jqueryElementId).html(htmlText);
}


UtilsTopicLinks.prototype.DisplayParentTopicLinksTable = function(jsonData, jqueryElementId, elementsPrefix)
{
    var htmlText = this.CreateChildTopicLinksTableHtml(jsonData, "Parent Topics", this.dataTopicLinks.fieldNameParentId, jqueryElementId, elementsPrefix);
    $(jqueryElementId).html(htmlText);
}


UtilsTopicLinks.prototype.CreateTopicElementId = function(topicId, addJQueryId, elementsPrefix)
{ 
    var topicElementId = this.utilsHtml.CreateElementIdP(elementsPrefix, "Topic", topicId, addJQueryId);
    return topicElementId;
}
                                               
UtilsTopicLinks.prototype.CreateChildTopicLinksTableHtml = function(jsonData, heading1, fieldNameTopicId, jqueryElementId, elementsPrefix)
{
    var thisObject = this;
    var addJQueryId = false;
    var buttonEnabled = true;
    var tableRows = this.utilsHtml.EmptyHtml();
    $.each(jsonData, function(index, entry){
        // Get entry info. The topicLinkText entry is given by heading1 i.e. Title or Flip Title
        //var relationshipId = entry[thisObject.dataTopicLinks.fieldNameRelationshipId];
        var topicName = entry[thisObject.dataTopicLinks.fieldNameTopicName];
        var topicId = entry[fieldNameTopicId];
        //var selectionCount = entry[thisObject.dataTopicLinks.fieldNameSelectionCount];
        // Calculate values to go in the table row
        var topicElementId = thisObject.CreateTopicElementId(topicId, addJQueryId, elementsPrefix);
        
        // Create html for table column entries
        var tableEntries = thisObject.utilsHtml.EmptyHtml();
        // Column - link button
        tableEntries += thisObject.utilsHtml.ButtonTableEntry(topicElementId, topicName, true);
        // Create html for row
        tableRows += thisObject.utilsHtml.WrapInDiv(tableEntries);
    });
    // Build the table
    html = tableRows;               
    return html;
}
 
 
    //
    // 
    // Interface
    // 
    // 


UtilsTopicLinks.prototype.DisplayAndBindChildTopicLinks = function(jqueryElementId, jqidNone, noneText, elementsPrefix, debugOutputPrefixAddTopicLink)
{
    var jsonData = this.dataTopicLinks.dataChild;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayChildTopicLinksTable(jsonData, jqueryElementId, elementsPrefix);
    this.Bind(jsonData, elementsPrefix, 0, debugOutputPrefixAddTopicLink);
}


UtilsTopicLinks.prototype.DisplayAndBindParentTopicLinks = function(jqueryElementId, jqidNone, noneText, elementsPrefix, debugOutputPrefixAddTopicLink)
{
    var jsonData = this.dataTopicLinks.dataParent;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayParentTopicLinksTable(jsonData, jqueryElementId, elementsPrefix);
    this.Bind(jsonData, elementsPrefix, 1, debugOutputPrefixAddTopicLink);
}

UtilsTopicLinks.prototype.DisplayChildTopicLinksPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.childTopicLinksPageIndex;
    var lastPage = this.dataTopicLinks.lastPageChild;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}

UtilsTopicLinks.prototype.DisplayParentTopicLinksPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.parentTopicLinksPageIndex;
    var lastPage = this.dataTopicLinks.lastPageParent;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}


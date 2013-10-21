    // 
    // Constructor
    // 
function UtilsArgTopics()
{
    this.utilsHtml = new UtilsHtml();
    this.utilsPage = new UtilsPage();
}

    // All Names
UtilsArgTopics.prototype.elementNameDelete = "Delete";
UtilsArgTopics.prototype.elementNameArgTopic = "ArgTopic";
  

UtilsArgTopics.prototype.Init = function(eventHandler, navigation, dataArgTopics)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
    this.dataArgTopics = dataArgTopics;
}


UtilsArgTopics.prototype.Bind = function(jsonData, elementsPrefix, debugOutputIdClickArgTopic)
{
    var thisObject = this;
    var addJQueryId = true;
    var addJQueryIdForElement = false;
    $.each(jsonData, function(index, entry){
        // Create the jQuery ids for each relationship entry, from the unique relationshipId
        // The functions ensure it matches up with the html
        var tagId = entry[thisObject.dataArgTopics.fieldNameTagId];
        var topicId = entry[thisObject.dataArgTopics.fieldNameTopicId];
        var topicName = entry[thisObject.dataArgTopics.fieldNameTopicName];
        var argId = entry[thisObject.dataArgTopics.fieldNameArgumentId];
        
        var argTopicIdName = thisObject.CreateArgTopicElementId(tagId, addJQueryId, elementsPrefix);
        
        // Bind functions to the elements
        $(argTopicIdName).click(function(){thisObject.OnArgTopicClicked(topicId, topicName, tagId);});
    });
}


UtilsArgTopics.prototype.CreateArgTopicElementId = function(tagId, addJQueryId, elementsPrefix)
{
    var argTopicElementId = this.utilsHtml.CreateElementIdP(elementsPrefix, this.elementNameArgTopic, tagId, addJQueryId);
    return argTopicElementId;
}



    // 
    // Event Handlers
    //



UtilsArgTopics.prototype.OnArgTopicClicked = function(topicId, topicName, tagId)
{
    this.navigation.topicId = topicId;
    this.navigation.topicName = topicName;
    this.navigation.tagId = tagId;
    this.eventHandler.fire(this.dataArgTopics.eventNameArgTopicSelected);
}



    // 
    // Display
    //


UtilsArgTopics.prototype.DisplayTable2 = function(jsonData, jqueryElementId, elementsPrefix)
{
    var htmlText = this.CreateArgTopicsTableHtml2(jsonData, jqueryElementId, elementsPrefix);
    $(jqueryElementId).html(htmlText);
}


UtilsArgTopics.prototype.CreateArgTopicsTableHtml2 = function(jsonData, jqueryElementId, elementsPrefix)
{
    var thisObject = this;
    var addJQueryId = false;
    var tableRows = this.utilsHtml.EmptyHtml();
    $.each(jsonData, function(index, entry){
        // Get info
        var tagId = entry[thisObject.dataArgTopics.fieldNameTagId];
        var topicName = entry[thisObject.dataArgTopics.fieldNameTopicName];
        var argTopicElementId = thisObject.CreateArgTopicElementId(tagId, addJQueryId, elementsPrefix);
        
        // Create html for table column entries
        var tableEntries = thisObject.utilsHtml.EmptyHtml();
        // Column - link button
        tableEntries += thisObject.utilsHtml.Button(argTopicElementId, topicName, true);
        
        // Create html for row
        tableRows += tableEntries;
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



UtilsArgTopics.prototype.AddArgTopicTag = function(jqueryIdAddTopicTag, argId, debugOutputId)
{
    var topicTagName = $(jqueryIdAddTopicTag).val();
    this.dataArgTopics.AddArgTopicTag(topicTagName, argId, debugOutputId);
    $(jqueryIdAddTopicTag).val("");
}
                        

UtilsArgTopics.prototype.DisplayAndBindArgTopics = function(jqueryElementId, jqidNone, noneText, elementsPrefix, heading, debugOutputIdClickArgTopic)
{
    var jsonData = this.dataArgTopics.data;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayTable2(jsonData, jqueryElementId, elementsPrefix);
    this.Bind(jsonData, elementsPrefix, debugOutputIdClickArgTopic);
}

UtilsArgTopics.prototype.DisplayArgPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.argTopicsPageIndex;
    var lastPage = this.dataArgTopics.lastPage;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}




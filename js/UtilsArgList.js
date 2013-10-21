    // 
    // Constructor
    // 
function UtilsArgList()
{
    this.utilsHtml = new UtilsHtml();
    this.utilsPage = new UtilsPage();
}

    // All Names
UtilsArgList.prototype.elementNameDelete = "Delete";
UtilsArgList.prototype.elementNameCheckbox = "Checkbox";
UtilsArgList.prototype.elementNameArgLink = "ArgLink";
UtilsArgList.prototype.elementNameArgEntry = "ArgEntry";  
UtilsArgList.prototype.eventNameArgSelected = "ArgSelected";

UtilsArgList.prototype.Init = function(eventHandler, navigation, dataArgList)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
    this.dataArgList = dataArgList;
}


UtilsArgList.prototype.CreateArgEntryElementId = function(argId, addJQueryId, elementsPrefix)
{
    var argEntryElementId = this.utilsHtml.CreateElementIdP(elementsPrefix, this.elementNameArgEntry, argId, addJQueryId);
    return argEntryElementId;
}



    // 
    // Event Handlers
    //
 
UtilsArgList.prototype.OnArgEntryClicked = function(argId, debugOutputIdClickArgEntry)
{
    this.navigation.argId = argId;
    this.eventHandler.fire(this.eventNameArgSelected);
}


    // 
    // Bind
    //

 
UtilsArgList.prototype.BindArgList = function(jsonData, elementsPrefix, debugOutputIdClickArgEntry)
{
    var thisObject = this;
    var addJQueryId = true;
    var addJQueryIdForElement = false;
    $.each(jsonData, function(index, entry){
        // Create the jQuery ids for each relationship entry, from the unique relationshipId
        // The functions ensure it matches up with the html
        var tagId = entry[thisObject.dataArgList.fieldNameTagId];
        var argId = entry[thisObject.dataArgList.fieldNameArgId];
        var topicId = entry[thisObject.dataArgList.fieldNameTopicId];
        var argTitle = entry[thisObject.dataArgList.fieldNameArgTitle];
        
        var argEntryIdName = thisObject.CreateArgEntryElementId(argId, addJQueryId, elementsPrefix);

        // Bind functions to the elements
        $(argEntryIdName).click(function(){thisObject.OnArgEntryClicked(argId, debugOutputIdClickArgEntry);});
    });
}




    // 
    // Display
    //


UtilsArgList.prototype.DisplayTable = function(jsonData, jqueryElementId, elementsPrefix)
{
    var htmlText = this.CreateArgListTableHtml(jsonData, jqueryElementId, elementsPrefix);
    $(jqueryElementId).html(htmlText);
}


UtilsArgList.prototype.CreateArgListTableHtml = function(jsonData, jqueryElementId, elementsPrefix)
{
    var thisObject = this;
    var addJQueryId = false;
    var buttonEnabled = true;
    //var noOfArgsToDisplay = g_config.m_noOfArgsToDisplay;
    var tableRows = this.utilsHtml.EmptyHtml();
    $.each(jsonData, function(index, entry){
        var tagId = entry[thisObject.dataArgList.fieldNameTagId];
        var argId = entry[thisObject.dataArgList.fieldNameArgId];
        var topicId = entry[thisObject.dataArgList.fieldNameTopicId];
        var argTitle = entry[thisObject.dataArgList.fieldNameArgTitle];
        var argEntryElementId = thisObject.CreateArgEntryElementId(argId, addJQueryId, elementsPrefix);
        
        // Create html for table column entries
        var tableEntries = thisObject.utilsHtml.EmptyHtml();
        // Column - Entry button
        tableEntries += thisObject.utilsHtml.ButtonTableEntry(argEntryElementId, argTitle, true);
        
        // Create html for row
        tableRows += thisObject.utilsHtml.WrapInDiv(tableEntries);
        
        /*
        // The server will return more than the no. of args to display.
        noOfArgsToDisplay--;
        if (noOfArgsToDisplay == 0)
        {
            return false;
        }
        */
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



UtilsArgList.prototype.DisplayAndBindArgList = function(jqueryElementId, jqidNone, noneText, elementsPrefix, debugOutputIdClickArgEntry)
{
    var jsonData = this.dataArgList.data;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayTable(jsonData, jqueryElementId, elementsPrefix);
    this.BindArgList(jsonData, elementsPrefix, debugOutputIdClickArgEntry);    
}

UtilsArgList.prototype.DisplayArgPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.argPageIndex;
    var lastPage = this.dataArgList.lastPage;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}

    // 
    // Constructor
    // 
function UtilsArgLinks()
{
    this.utilsHtml = new UtilsHtml();
    this.utilsPage = new UtilsPage();
}

    // All Names
UtilsArgLinks.prototype.elementNameArgLink = "ArgLink";
UtilsArgLinks.prototype.eventNameArgLinkClicked = "ArgLinkClicked";

  

UtilsArgLinks.prototype.Init = function(eventHandler, navigation, dataArgLinks)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
    this.dataArgLinks = dataArgLinks;
}


UtilsArgLinks.prototype.CreateArgLinkElementId = function(relationshipId, addJQueryId, elementsPrefix)
{
    var argLinkElementId = this.utilsHtml.CreateElementIdP(elementsPrefix, this.elementNameArgLink, relationshipId, addJQueryId);
    return argLinkElementId;
}

        

    // 
    // Bind
    //


UtilsArgLinks.prototype.BindArgLinkClicked = function(jsonData, elementsPrefix, fieldNameLinkedArgId)
{
    var thisObject = this;
    var addJQueryId = true;
    
    $.each(jsonData, function(index, entry){
        // CreateArgLinkElementId()  creates the jQuery ids for each entry, from the unique relationshipId (argId itself may appear in parent and child lists)
        var relationshipId = entry[thisObject.dataArgLinks.fieldNameRelationshipId];
        var jqidArgLink = thisObject.CreateArgLinkElementId(relationshipId, addJQueryId, elementsPrefix);       
        var linkedArgId = entry[fieldNameLinkedArgId];
        
        // Bind functions to the elements
        $(jqidArgLink).click(function(){thisObject.OnArgLinkClicked(linkedArgId, relationshipId);});
    });
}                                     

UtilsArgLinks.prototype.BindChildArgLinkClicked = function(jsonData, elementsPrefix)
{
    var fieldNameLinkedArgId = this.dataArgLinks.fieldNameChildId; 
    this.BindArgLinkClicked(jsonData, elementsPrefix, fieldNameLinkedArgId);    
}

UtilsArgLinks.prototype.BindParentArgLinkClicked = function(jsonData, elementsPrefix)
{
    var fieldNameLinkedArgId = this.dataArgLinks.fieldNameParentId; 
    this.BindArgLinkClicked(jsonData, elementsPrefix, fieldNameLinkedArgId);    
}


    // 
    // Display
    //
                                               

                                               
UtilsArgLinks.prototype.DisplayLinksTable = function(jsonData, jqidArgLinks, fieldNameArgTitle, elementsPrefix)
{
    var thisObject = this;
    var addJQueryId = false;
    var buttonsEnabled = true;
    
    var tableRows = this.utilsHtml.EmptyHtml();
    $.each(jsonData, function(index, entry){
        var relationshipId = entry[thisObject.dataArgLinks.fieldNameRelationshipId];
        var argTitle = entry[fieldNameArgTitle];
        
        // Calculate values to go in the table row
        var argLinkElementId = thisObject.CreateArgLinkElementId(relationshipId, addJQueryId, elementsPrefix);
        
        // Create html for table column entries
        var tableEntries = thisObject.utilsHtml.EmptyHtml();
        // Column - link button
        tableEntries += thisObject.utilsHtml.ButtonTableEntry(argLinkElementId, argTitle, buttonsEnabled);
        
        // Create html for row
        tableRows += thisObject.utilsHtml.WrapInDiv(tableEntries);
    });
    // Build the table
    html = tableRows;
    // Set text
    $(jqidArgLinks).html(html);
}


UtilsArgLinks.prototype.DisplayChildLinksTable = function(jsonData, jqidArgLinks, elementsPrefix)
{
    //var fieldNameArgTitle = this.dataArgLinks.fieldNameChildArgTitle;
    var fieldNameArgTitle = this.dataArgLinks.fieldNameArgTitle;
    this.DisplayLinksTable(jsonData, jqidArgLinks, fieldNameArgTitle, elementsPrefix);
}

UtilsArgLinks.prototype.DisplayParentLinksTable = function(jsonData, jqidArgLinks, elementsPrefix)
{
    //var fieldNameArgTitle = this.dataArgLinks.fieldNameParentArgTitle;
    var fieldNameArgTitle = this.dataArgLinks.fieldNameArgTitle;
    this.DisplayLinksTable(jsonData, jqidArgLinks, fieldNameArgTitle, elementsPrefix);
}
 
 
    // 
    // Event Handlers
    //


UtilsArgLinks.prototype.OnArgLinkClicked = function(argId, relationshipId)
{
    this.navigation.argId = argId;
    this.navigation.argRelationshipId = relationshipId;
    this.eventHandler.fire(this.eventNameArgLinkClicked);
}
 
 
 
    //
    // 
    // Interface
    // 
    // 



UtilsArgLinks.prototype.DisplayAndBindArgChildLinks = function(jqidArgLinks, jqidNone, noneText, elementsPrefix)
{
    var jsonData = this.dataArgLinks.dataChild;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayChildLinksTable(jsonData, jqidArgLinks, elementsPrefix);
    this.BindChildArgLinkClicked(jsonData, elementsPrefix);    
}


UtilsArgLinks.prototype.DisplayAndBindArgParentLinks = function(jqidArgLinks, jqidNone, noneText, elementsPrefix)
{
    var jsonData = this.dataArgLinks.dataParent;
    if (jsonData == null) return;
    
    this.utilsHtml.DisplayEmptyJsonDataMessage(jsonData, jqidNone, noneText);
    this.DisplayParentLinksTable(jsonData, jqidArgLinks, elementsPrefix);
    this.BindParentArgLinkClicked(jsonData, elementsPrefix);    
}

UtilsArgLinks.prototype.DisplayChildArgLinksPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.childArgLinksPageIndex;
    var lastPage = this.dataArgLinks.lastPageChild;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}

UtilsArgLinks.prototype.DisplayParentArgLinksPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext)
{
    var pageIndex = this.navigation.parentArgLinksPageIndex;
    var lastPage = this.dataArgLinks.lastPageParent;
    this.utilsPage.DisplayArgPageNumber(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage);
}



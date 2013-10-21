    // 
    // Constructor
    // 
function OneArg()
{
    this.dataArg = new DataArg();
    this.utilsArg = new UtilsArg();
    this.dataArgLinks = new DataArgLinks();
    this.utilsArgLinks = new UtilsArgLinks();
    this.dataArgTopics = new DataArgTopics();
    this.utilsArgTopics = new UtilsArgTopics();
    this.utilsAddArgLink = new UtilsAddArgLink();   
}

   

    // Names - in the html. jquery ids and debug output prefixes. 
    // Elements prefixes - to distinguish identical elements in different displays e.g. if clipboard displayed twice.
    //OneArg.prototype.jqueryIdNewArgButton = "#newArgButton";
    //OneArg.prototype.jqueryIdExistingArgButton = "#existingArgButton";
OneArg.prototype.jqueryIdArgText = "#argText";
OneArg.prototype.jqueryIdArgEntry = "#oneArg";
OneArg.prototype.jqueryIdArgTopics = "#argTopics";
OneArg.prototype.jqueryIdArgTopics2 = "#argTopics2";
//OneArg.prototype.jqueryIdAddArgTopic = "#addArgTopic";
OneArg.prototype.jqueryIdAddTopicTag = "#addTopicTagName";
OneArg.prototype.jqueryIdAddTopicTagNameCancel = "#addTopicTagNameCancel";
//OneArg.prototype.jqueryIdAddTopicNameVisibility = "#addTopicTagNameVisibility";
OneArg.prototype.jqueryIdArgChildLinks = "#argLinks";
OneArg.prototype.jqueryIdArgParentLinks = "#argLinksBack";
OneArg.prototype.jqueryIdAddArgLink = "#createArgLink";
OneArg.prototype.jqidArgGraphTagsNone = "#tabArgGraphTagsNone";
OneArg.prototype.jqidArgGraphChildArgLinksNone = "#tabArgGraphChildArgLinksNone";
OneArg.prototype.jqidArgGraphParentArgLinksNone = "#tabArgGraphParentArgLinksNone";
OneArg.prototype.jqidArgGraphTagList = "#tabArgGraphTagList";
OneArg.prototype.jqidArgGraphTagListPrev = "#tabArgGraphTagListPrev";
OneArg.prototype.jqidArgGraphTagListNext = "#tabArgGraphTagListNext";
OneArg.prototype.jqidArgGraphTagListPage = "#tabArgGraphTagListPage";
OneArg.prototype.jqidArgGraphChildArgList = "#tabArgGraphChildArgList";
OneArg.prototype.jqidArgGraphChildArgListPrev = "#tabArgGraphChildArgListPrev";
OneArg.prototype.jqidArgGraphChildArgListNext = "#tabArgGraphChildArgListNext";
OneArg.prototype.jqidArgGraphChildArgListPage = "#tabArgGraphChildArgListPage";
OneArg.prototype.jqidArgGraphParentArgList = "#tabArgGraphParentArgList";
OneArg.prototype.jqidArgGraphParentArgListPrev = "#tabArgGraphParentArgListPrev";
OneArg.prototype.jqidArgGraphParentArgListNext = "#tabArgGraphParentArgListNext";
OneArg.prototype.jqidArgGraphParentArgListPage = "#tabArgGraphParentArgListPage";

OneArg.prototype.argTopicHeading = "Tags";
OneArg.prototype.elementNameArgHeading = "argHeading";
    //OneArg.prototype.argLinksPrefix = "L_";
OneArg.prototype.argChildLinksPrefix = "C_";
OneArg.prototype.argParentLinksPrefix = "P_";
OneArg.prototype.argTopicsPrefix = "T_";
OneArg.prototype.fieldNameArgumentId = 'id_argument';
OneArg.prototype.debugOutputPrefixLoadArgEntry = "LoadArgEntry";
OneArg.prototype.debugOutputPrefixChangeArgTitle = "ChangeArgTitle";
OneArg.prototype.debugOutputPrefixLoadArgChildLinks = "LoadArgChildLinks";
OneArg.prototype.debugOutputPrefixLoadArgParentLinks = "LoadArgParentLinks";
OneArg.prototype.debugOutputPrefixSelectArgTopic = "SelectArgTopic";
OneArg.prototype.debugOutputPrefixSelectArgInTopic = "SelectArgInTopic";
OneArg.prototype.debugOutputPrefixSelectArgLink = "SelectArgLink";
OneArg.prototype.debugOutputPrefixChangeArgLinkTitle = "ChangeArgLinkTitle";
    //OneArg.prototype.debugOutputPrefixLoadAddArgLink = "LoadAddArgLink";
OneArg.prototype.debugOutputPrefixAddArgLink = "AddArgLink";
OneArg.prototype.debugOutputPrefixClickArgLink = "ClickArgLink";
OneArg.prototype.debugOutputPrefixLoadArgTopics = "LoadArgTopics";
OneArg.prototype.debugOutputPrefixClickArgTopic = "ClickArgTopic";
OneArg.prototype.debugOutputPrefixAddArgTopic = "AddArgTopic";
OneArg.prototype.argGraphTagsNoneText = "(none)";
OneArg.prototype.argGraphChildArgLinksNoneText = "(none)";
OneArg.prototype.argGraphParentArgLinksNoneText = "(nothing)";

    // 
    // Init
    //


OneArg.prototype.Init = function(eventHandler, navigation)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;

    this.dataArg.Init(this.eventHandler)
    this.utilsArg.Init(this.eventHandler, this.dataArg)
    this.dataArgLinks.Init(this.eventHandler);
    this.utilsArgLinks.Init(this.eventHandler, this.navigation, this.dataArgLinks);
    this.dataArgTopics.Init(this.eventHandler, this.navigation);
    this.utilsArgTopics.Init(this.eventHandler, this.navigation, this.dataArgTopics);
    this.utilsAddArgLink.Init(this.eventHandler, this.navigation);  
    
}


OneArg.prototype.Bind = function()
{
    var thisObject = this;
    
    // Bind - elements in page
    // Add arg topic
    //$(this.jqueryIdAddArgTopic).click(function(){thisObject.OnAddArgTopicClicked();});
    $(this.jqueryIdAddTopicTag).change(function(){thisObject.OnChangeToTopicTag();});
    //$(this.jqueryIdAddTopicTagNameCancel).click(function(){thisObject.OnAddTopicTagNameCancelClicked();});
    $(this.jqidArgGraphTagListPrev).click(function(){thisObject.OnTagListPagePrev();});
    $(this.jqidArgGraphTagListNext).click(function(){thisObject.OnTagListPageNext();});
    $(this.jqidArgGraphChildArgListPrev).click(function(){thisObject.OnChildArgLinksPagePrev();});
    $(this.jqidArgGraphChildArgListNext).click(function(){thisObject.OnChildArgLinksPageNext();});
    $(this.jqidArgGraphParentArgListPrev).click(function(){thisObject.OnParentArgLinksPagePrev();});
    $(this.jqidArgGraphParentArgListNext).click(function(){thisObject.OnParentArgLinksPageNext();});

    // Bind - action after loaded events
    this.eventHandler.addListener(this.dataArg.eventNameArgLoaded, function(){thisObject.OnArgEntryLoaded();});
    this.eventHandler.addListener(this.dataArgLinks.eventNameArgChildLinksLoaded, function(){thisObject.OnArgChildLinksLoaded();});
    this.eventHandler.addListener(this.dataArgLinks.eventNameArgParentLinksLoaded, function(){thisObject.OnArgParentLinksLoaded();});
    this.eventHandler.addListener(this.dataArgTopics.eventNameArgTopicsLoaded, function(){thisObject.OnArgTopicsLoaded();});

    // Bind - after other events
    this.eventHandler.addListener(this.dataArgTopics.eventNameArgTopicAdded, function(){thisObject.OnArgTopicAdded();});
    //this.eventHandler.addListener(this.utilsArgLinks.eventNameArgLinkClicked, function(){thisObject.OnArgLinkClicked();});

    // Bind - create arg link
    this.eventHandler.addListener(this.utilsAddArgLink.eventNameArgLinkAdded, function(){thisObject.OnArgLinkAdded();});
    this.eventHandler.addListener(this.utilsAddArgLink.eventNameExistingArgLinkAdded, function(){thisObject.OnExistingArgLinkAdded();});

    this.utilsAddArgLink.Bind();
}



    // 
    // Load
    //
    
    
OneArg.prototype.Load = function()
{
    this.LoadContent();
}
        
OneArg.prototype.LoadContent = function()
{
    if (!this.navigation.loadEntry)
        return;
    
    this.LoadArg();
    this.LoadArgChildLinks();
    this.LoadArgParentLinks();
    this.LoadArgTopics();
}
    

OneArg.prototype.LoadArg = function()
{
    var argId = this.navigation.argId;  
    this.dataArg.LoadArg(argId, this.debugOutputPrefixLoadArgEntry);
}

OneArg.prototype.LoadArgChildLinks = function()
{
    var argId = this.navigation.argId;  
    var childArgLinksPageIndex = this.navigation.childArgLinksPageIndex;
    this.dataArgLinks.LoadArgChildLinks(argId, childArgLinksPageIndex, this.debugOutputPrefixLoadArgChildLinks);
}

OneArg.prototype.LoadArgParentLinks = function()
{
    var argId = this.navigation.argId;  
    var parentArgLinksPageIndex = this.navigation.parentArgLinksPageIndex; 
    this.dataArgLinks.LoadArgParentLinks(argId, parentArgLinksPageIndex, this.debugOutputPrefixLoadArgParentLinks);
}
     
OneArg.prototype.LoadArgTopics = function()
{
    var argId = this.navigation.argId;  
    var argTopicsPageIndex = this.navigation.argTopicsPageIndex; 
    this.dataArgTopics.LoadArgTopics(argId, argTopicsPageIndex, this.debugOutputPrefixLoadArgTopics);
}



    // 
    // Display
    //


OneArg.prototype.DisplayArg = function()
{
    this.utilsArg.DisplayArg(this.jqueryIdArgText);
}

OneArg.prototype.DisplayArgChildLinks = function()
{
    this.utilsArgLinks.DisplayAndBindArgChildLinks(this.jqueryIdArgChildLinks, this.jqidArgGraphChildArgLinksNone, this.argGraphChildArgLinksNoneText, this.argChildLinksPrefix, this.debugOutputPrefixClickArgLink);
    this.utilsArgLinks.DisplayChildArgLinksPageNumber(this.jqidArgGraphChildArgList, this.jqidArgGraphChildArgListPage, this.jqidArgGraphChildArgListPrev, this.jqidArgGraphChildArgListNext);
}

OneArg.prototype.DisplayArgParentLinks = function()
{
    this.utilsArgLinks.DisplayAndBindArgParentLinks(this.jqueryIdArgParentLinks, this.jqidArgGraphParentArgLinksNone, this.argGraphParentArgLinksNoneText, this.argParentLinksPrefix, this.debugOutputPrefixClickArgLink);
    this.utilsArgLinks.DisplayParentArgLinksPageNumber(this.jqidArgGraphParentArgList, this.jqidArgGraphParentArgListPage, this.jqidArgGraphParentArgListPrev, this.jqidArgGraphParentArgListNext);
}

OneArg.prototype.DisplayArgTopics = function()
{
    this.utilsArgTopics.DisplayAndBindArgTopics(this.jqueryIdArgTopics2, this.jqidArgGraphTagsNone, this.argGraphTagsNoneText, this.argTopicsPrefix, this.argTopicHeading, this.debugOutputPrefixClickArgTopic);
    this.utilsArgTopics.DisplayArgPageNumber(this.jqidArgGraphTagList, this.jqidArgGraphTagListPage, this.jqidArgGraphTagListPrev, this.jqidArgGraphTagListNext);
}


    // 
    // Event Handlers
    //

OneArg.prototype.OnArgEntryLoaded = function()
{
    this.DisplayArg();
}

OneArg.prototype.OnArgChildLinksLoaded = function()
{
    this.DisplayArgChildLinks();
}

OneArg.prototype.OnArgParentLinksLoaded = function()
{
    this.DisplayArgParentLinks();
}

OneArg.prototype.OnArgTopicsLoaded = function()
{
    this.DisplayArgTopics();
}

OneArg.prototype.OnChangeToTopicTag = function()
{
    var argId = this.navigation.argId;  
    this.utilsArgTopics.AddArgTopicTag(this.jqueryIdAddTopicTag, argId, this.debugOutputPrefixAddArgTopic);
}

OneArg.prototype.OnTagListPagePrev = function()
{
    this.navigation.argTopicsPageIndex--;
    this.LoadArgTopics();
}
           
OneArg.prototype.OnTagListPageNext = function()
{
    this.navigation.argTopicsPageIndex++;
    this.LoadArgTopics();
}
        
OneArg.prototype.OnChildArgLinksPagePrev = function()
{
    this.navigation.childArgLinksPageIndex--;
    this.LoadArgChildLinks();
}
           
OneArg.prototype.OnChildArgLinksPageNext = function()
{
    this.navigation.childArgLinksPageIndex++;
    this.LoadArgChildLinks();
}
        
OneArg.prototype.OnParentArgLinksPagePrev = function()
{
    this.navigation.parentArgLinksPageIndex--;
    this.LoadArgParentLinks();
}
           
OneArg.prototype.OnParentArgLinksPageNext = function()
{
    this.navigation.parentArgLinksPageIndex++;
    this.LoadArgParentLinks();
}
                                        
OneArg.prototype.OnArgLinkAdded = function()
{
    this.LoadArgChildLinks();
}

OneArg.prototype.OnExistingArgLinkAdded = function()
{
    this.LoadArgChildLinks();
}

OneArg.prototype.OnArgTopicAdded = function()
{
    this.LoadArgTopics();
}




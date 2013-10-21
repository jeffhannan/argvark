    // 
    // Constructor
    // 
function OneTopic()
{
    this.dataTopic = new DataTopic();
    this.utilsTopic = new UtilsTopic();
    this.dataTopicLinks = new DataTopicLinks();
    this.utilsTopicLinks = new UtilsTopicLinks();
    this.dataArgList = new DataArgList();
    this.utilsArgList = new UtilsArgList();
    //this.dataArgTopics = new DataArgTopics();
    this.utilsUrl = new UtilsUrl();
}



    // Names - in the html. jquery ids and debug output prefixes. 
    // Elements prefixes - to distinguish identical elements in different displays e.g. if clipboard displayed twice.
OneTopic.prototype.jqueryIdNewArgButton = "#newArgInTopicButton";
OneTopic.prototype.jqueryIdNewArgButton2 = "#newArgInTopicButton2";
OneTopic.prototype.jqueryIdNewArgTextVisibility = "#newArgInTopicTextVisibility";
OneTopic.prototype.jqueryIdNewArgTextCancel = "#newArgInTopicTextCancel";
OneTopic.prototype.jqueryIdNewArgTextInput = "#newArgInTopicTextInput";
OneTopic.prototype.jqueryIdNewArgTextInput2 = "#newArgInTopicTextInput2";
OneTopic.prototype.jqueryIdAddTopicLink = "#addTopicLink";
OneTopic.prototype.jqueryIdChildTopicLinks = "#childTopics";
OneTopic.prototype.jqueryIdParentTopicLinks = "#parentTopics";
OneTopic.prototype.jqidChildTopicsNone = "#tabTopicGraphChildTopicsNone";
OneTopic.prototype.jqidParentTopicsNone = "#tabTopicGraphParentTopicsNone";
OneTopic.prototype.jqidTopicGraphTopicArgsNone = "#tabTopicGraphTopicArgsNone";
OneTopic.prototype.jqidTopicArgsTopicArgsNone = "#tabTopicArgsTopicArgsNone";
OneTopic.prototype.jqidTopicGraphChildTopicList = "#tabTopicGraphChildTopicList";
OneTopic.prototype.jqidTopicGraphChildTopicListPrev = "#tabTopicGraphChildTopicListPrev";
OneTopic.prototype.jqidTopicGraphChildTopicListNext = "#tabTopicGraphChildTopicListNext";
OneTopic.prototype.jqidTopicGraphChildTopicListPage = "#tabTopicGraphChildTopicListPage";
OneTopic.prototype.jqidTopicGraphParentTopicList = "#tabTopicGraphParentTopicList";
OneTopic.prototype.jqidTopicGraphParentTopicListPrev = "#tabTopicGraphParentTopicListPrev";
OneTopic.prototype.jqidTopicGraphParentTopicListNext = "#tabTopicGraphParentTopicListNext";
OneTopic.prototype.jqidTopicGraphParentTopicListPage = "#tabTopicGraphParentTopicListPage";
OneTopic.prototype.jqidTopicGraphArgList = "#tabTopicGraphArgList";
OneTopic.prototype.jqidTopicGraphArgListPrev = "#tabTopicGraphArgListPrev";
OneTopic.prototype.jqidTopicGraphArgListNext = "#tabTopicGraphArgListNext";
OneTopic.prototype.jqidTopicGraphArgListPage = "#tabTopicGraphArgListPage";
OneTopic.prototype.jqidTopicArgsArgList = "#tabTopicArgsArgList";
OneTopic.prototype.jqidTopicArgsArgListPrev = "#tabTopicArgsArgListPrev";
OneTopic.prototype.jqidTopicArgsArgListNext = "#tabTopicArgsArgListNext";
OneTopic.prototype.jqidTopicArgsArgListPage = "#tabTopicArgsArgListPage";
    // Duplicate displays
OneTopic.prototype.jqueryIdTopicNameTopicGraph = "#topicNameTopicGraph";
OneTopic.prototype.jqueryIdTopicNameTopicArgs = "#topicNameTopicArgs";
OneTopic.prototype.jqueryIdArgListTopicGraph = "#argListTopicGraph";
OneTopic.prototype.jqueryIdArgListTopicArgs = "#argListTopicArgs";
//OneTopic.prototype.jqueryIdArgListTopicGraph = "#argListTopicGraph";
//OneTopic.prototype.jqueryIdArgListTopicArgs = "#argListTopicArgs";

OneTopic.prototype.eventNameArgSelected = "ArgSelected";
OneTopic.prototype.eventNameTopicSelected = "TopicSelected";
OneTopic.prototype.topicGraphTopicArgsNoneText = "(none)";
OneTopic.prototype.topicArgsTopicArgsNoneText = "No arguments yet";
OneTopic.prototype.topicGraphParentTopicsNoneText = "(none)";
OneTopic.prototype.topicGraphChildTopicsNoneText = "(none)";

OneTopic.prototype.childTopicsPrefix = "C_";
OneTopic.prototype.parentTopicsPrefix = "P_";
OneTopic.prototype.argListPrefixTopicGraph = "ATG_";
OneTopic.prototype.argListPrefixTopicArgs = "ATA_";

OneTopic.prototype.debugOutputPrefixLoadTopic = "LoadTopic";
OneTopic.prototype.debugOutputPrefixLoadChildTopicLinks = "LoadChildTopicLinks";
OneTopic.prototype.debugOutputPrefixLoadParentTopicLinks = "LoadParentTopicLinks";
OneTopic.prototype.debugOutputPrefixSelectTopicLink = "SelectTopicLink";
//OneTopic.prototype.debugOutputPrefixLoadAddTopicLink = "LoadAddTopicLink";
OneTopic.prototype.debugOutputPrefixAddTopicLink = "AddTopicLink";  
OneTopic.prototype.debugOutputPrefixNewArg = "NewArg";
OneTopic.prototype.debugOutputPrefixLoadArgList = "LoadArgList";
OneTopic.prototype.debugOutputPrefixClickArgEntry = "ClickArgEntry";
OneTopic.prototype.debugOutputPrefixAddArgTopic = "AddArgTopic";

    // These should be in objects somewhere
OneTopic.prototype.fieldNameArgumentId = 'id_argument';


    // 
    // Init
    //


OneTopic.prototype.Init = function(eventHandler, navigation)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
    
    this.dataTopic.Init(this.eventHandler);
    this.utilsTopic.Init(this.eventHandler, this.dataTopic);
    this.dataTopicLinks.Init(this.eventHandler);
    this.utilsTopicLinks.Init(this.eventHandler, this.navigation, this.dataTopicLinks);
    this.dataArgList.Init(this.eventHandler);
    this.utilsArgList.Init(this.eventHandler, this.navigation, this.dataArgList);
}


OneTopic.prototype.Bind = function()
{
    var thisObject = this;
    
    // Bind - elements in page
    //$(this.jqueryIdNewArgButton).click(function(){thisObject.OnNewArgButtonClicked();});
    $(this.jqueryIdNewArgTextCancel).click(function(){thisObject.OnNewArgCancelClicked();});
    $(this.jqueryIdNewArgTextInput).change(function(){thisObject.OnNewArgTextInputChanged();});
    $(this.jqueryIdNewArgTextInput2).change(function(){thisObject.OnNewArgTextInput2Changed();});
    $(this.jqidTopicGraphArgListPrev).click(function(){thisObject.OnArgListPagePrev();});
    $(this.jqidTopicGraphArgListNext).click(function(){thisObject.OnArgListPageNext();});
    $(this.jqidTopicArgsArgListPrev).click(function(){thisObject.OnArgListPagePrev();});
    $(this.jqidTopicArgsArgListNext).click(function(){thisObject.OnArgListPageNext();});
    $(this.jqidTopicGraphChildTopicListPrev).click(function(){thisObject.OnChildTopicListPagePrev();});
    $(this.jqidTopicGraphChildTopicListNext).click(function(){thisObject.OnChildTopicListPageNext();});
    $(this.jqidTopicGraphParentTopicListPrev).click(function(){thisObject.OnParentTopicListPagePrev();});
    $(this.jqidTopicGraphParentTopicListNext).click(function(){thisObject.OnParentTopicListPageNext();});

    // Bind - action after loaded events
    this.eventHandler.addListener(this.dataTopic.eventNameTopicLoaded, function(){thisObject.OnTopicLoaded();});
    this.eventHandler.addListener(this.dataTopicLinks.eventNameChildTopicLinksLoaded, function(){thisObject.OnChildTopicLinksLoaded();});
    this.eventHandler.addListener(this.dataTopicLinks.eventNameParentTopicLinksLoaded, function(){thisObject.OnParentTopicLinksLoaded();});
    //this.eventHandler.addListener(this.utilsTopicLinks.eventNameAddTopicLinkLoaded, function(){thisObject.OnAddTopicLinkLoaded();});
    this.eventHandler.addListener(this.dataArgList.eventNameArgListLoaded, function(){thisObject.OnArgListLoaded();});

    // Bind - load after change events
    this.eventHandler.addListener(this.utilsTopicLinks.eventNameTopicLinkAdded, function(){thisObject.OnTopicLinkAdded();});
}

    // 
    // Load
    //
    
    
OneTopic.prototype.Load = function()
{
    this.LoadContent();
}
    
    
    
OneTopic.prototype.LoadContent = function()
{
    if (!this.navigation.loadTopic)
        return;
    
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var argPageIndex = this.navigation.argPageIndex; 
    var childTopicLinksPageIndex = this.navigation.childTopicLinksPageIndex; 
    var parentTopicLinksPageIndex = this.navigation.parentTopicLinksPageIndex; 
    this.LoadTopic(topicId, topicName);
    this.LoadChildTopicLinks(topicId, topicName, childTopicLinksPageIndex);
    this.LoadParentTopicLinks(topicId, topicName, parentTopicLinksPageIndex);
    this.LoadArgList(topicId, topicName, argPageIndex);
}
    
OneTopic.prototype.LoadTopic = function(topicId, topicName)
{
    this.dataTopic.LoadTopic(topicId, topicName, this.debugOutputPrefixLoadTopic);
}
    
OneTopic.prototype.LoadChildTopicLinks = function(topicId, topicName, pageIndex)
{
    this.dataTopicLinks.LoadChildTopicLinks(topicId, topicName, pageIndex, this.debugOutputPrefixLoadChildTopicLinks);
}

OneTopic.prototype.LoadParentTopicLinks = function(topicId, topicName, pageIndex)
{
    this.dataTopicLinks.LoadParentTopicLinks(topicId, topicName, pageIndex, this.debugOutputPrefixLoadParentTopicLinks);
}
         
OneTopic.prototype.LoadArgList = function(topicId, topicName, argPageIndex)
{
    this.dataArgList.LoadArgList(topicId, topicName, argPageIndex, this.debugOutputPrefixLoadArgList);
}
    
 
    // 
    // Display
    //


OneTopic.prototype.DisplayChildTopicLinks = function()
{
    this.utilsTopicLinks.DisplayAndBindChildTopicLinks(this.jqueryIdChildTopicLinks, this.jqidChildTopicsNone, this.topicGraphChildTopicsNoneText, this.childTopicsPrefix, this.debugOutputPrefixAddTopicLink);
    this.utilsTopicLinks.DisplayChildTopicLinksPageNumber(this.jqidTopicGraphChildTopicList, this.jqidTopicGraphChildTopicListPage, this.jqidTopicGraphChildTopicListPrev, this.jqidTopicGraphChildTopicListNext);
}

OneTopic.prototype.DisplayParentTopicLinks = function()
{
    this.utilsTopicLinks.DisplayAndBindParentTopicLinks(this.jqueryIdParentTopicLinks, this.jqidParentTopicsNone, this.topicGraphParentTopicsNoneText,  this.parentTopicsPrefix, this.debugOutputPrefixAddTopicLink);
    this.utilsTopicLinks.DisplayParentTopicLinksPageNumber(this.jqidTopicGraphParentTopicList, this.jqidTopicGraphParentTopicListPage, this.jqidTopicGraphParentTopicListPrev, this.jqidTopicGraphParentTopicListNext);
}

OneTopic.prototype.DisplayArgList = function()
{
    // TopicGraph
    this.utilsArgList.DisplayAndBindArgList(this.jqueryIdArgListTopicGraph, this.jqidTopicGraphTopicArgsNone, this.topicGraphTopicArgsNoneText, this.argListPrefixTopicGraph, this.debugOutputPrefixClickArgEntry);
    this.utilsArgList.DisplayArgPageNumber(this.jqidTopicGraphArgList, this.jqidTopicGraphArgListPage, this.jqidTopicGraphArgListPrev, this.jqidTopicGraphArgListNext);
    // TopicArgs
    this.utilsArgList.DisplayAndBindArgList(this.jqueryIdArgListTopicArgs, this.jqidTopicArgsTopicArgsNone, this.topicArgsTopicArgsNoneText, this.argListPrefixTopicArgs, this.debugOutputPrefixClickArgEntry);
    this.utilsArgList.DisplayArgPageNumber(this.jqidTopicArgsArgList, this.jqidTopicArgsArgListPage, this.jqidTopicArgsArgListPrev, this.jqidTopicArgsArgListNext);
}

OneTopic.prototype.DisplayTopic = function()
{
    this.utilsTopic.DisplayTopic(this.jqueryIdTopicNameTopicGraph, this.jqueryIdNewArgButton);
    this.utilsTopic.DisplayTopic(this.jqueryIdTopicNameTopicArgs, this.jqueryIdNewArgButton2);
}

    // 
    // Event Handlers
    //


    // Consider with a lot of these...
    // Maybe having OnTopicLoaded() is necessary as an indirection.
    // but maybe that indirection is already there in the bind call. 
    // i.e. bind(ontopicloaded)
    // but if the consequence is something specific, then could pull out.
    // OnTopicLoadedHandler(). But in the simple case, just call the functionality.
    // I guess my current approach means you don't have to look at the bind function
    // which is hard to read. Instead, we know that there is a pulled out function for 
    // every case, which makes it clear what events are handled.
    
OneTopic.prototype.OnTopicLoaded = function()
{
    this.DisplayTopic();
}

OneTopic.prototype.OnChildTopicLinksLoaded = function()
{
    this.DisplayChildTopicLinks();
}

OneTopic.prototype.OnParentTopicLinksLoaded = function()
{
    this.DisplayParentTopicLinks();
}


OneTopic.prototype.OnArgListLoaded = function()
{
    this.DisplayArgList();
}
  
OneTopic.prototype.OnTopicLinkAdded = function()
{
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    this.LoadChildTopicLinks(topicId, topicName);
    this.LoadParentTopicLinks(topicId, topicName);
}

        
OneTopic.prototype.OnArgListPagePrev = function()
{
    this.navigation.argPageIndex--;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var argPageIndex = this.navigation.argPageIndex; 
    this.LoadArgList(topicId, topicName, argPageIndex);
}
           
OneTopic.prototype.OnArgListPageNext = function()
{
    this.navigation.argPageIndex++;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var argPageIndex = this.navigation.argPageIndex; 
    this.LoadArgList(topicId, topicName, argPageIndex);
}
        
OneTopic.prototype.OnChildTopicListPagePrev = function()
{
    this.navigation.childTopicLinksPageIndex--;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var childTopicLinksPageIndex = this.navigation.childTopicLinksPageIndex; 
    this.LoadChildTopicLinks(topicId, topicName, childTopicLinksPageIndex);
}
           
OneTopic.prototype.OnChildTopicListPageNext = function()
{
    this.navigation.childTopicLinksPageIndex++;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var childTopicLinksPageIndex = this.navigation.childTopicLinksPageIndex; 
    this.LoadChildTopicLinks(topicId, topicName, childTopicLinksPageIndex);
}
        
OneTopic.prototype.OnParentTopicListPagePrev = function()
{
    this.navigation.parentTopicLinksPageIndex--;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var parentTopicLinksPageIndex = this.navigation.parentTopicLinksPageIndex; 
    this.LoadParentTopicLinks(topicId, topicName, parentTopicLinksPageIndex);
}
           
OneTopic.prototype.OnParentTopicListPageNext = function()
{
    this.navigation.parentTopicLinksPageIndex++;
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    var parentTopicLinksPageIndex = this.navigation.parentTopicLinksPageIndex; 
    this.LoadParentTopicLinks(topicId, topicName, parentTopicLinksPageIndex);
}
           
OneTopic.prototype.OnNewArgTextInputChanged = function()
{
    // Get the text
    var argText = $(this.jqueryIdNewArgTextInput).val();
    
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    
    // Set the topics in an attribute array
    var jsonPostData = {id_topic:topicId, topic_name:topicName, title:argText};
    // Create the url from the args
    //var url = this.utilsUrl.CreateUrl(g_config.m_addArgPhp, jsonPostData);
    
    // m_addArgPhp is the url to add a new argument. Send to server.
    var thisObject = this;
    // Send by POST
    g_debug.DisplayPostRequestPrefix(this.debugOutputPrefixNewArg, g_config.m_addArgPhp, jsonPostData);
    $.post(g_config.m_addArgPhp, jsonPostData, function(jsonCandidateText)
    //g_debug.DisplayPhpRequestUrlPrefix(this.debugOutputPrefixNewArg, url);
    //$.get(url, function(jsonCandidateText)
    {
        // Parse JSON
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        
        if (jsonData != null)
        {
            // Create the url of the new argument
            var argId = jsonData[thisObject.fieldNameArgumentId];
            thisObject.navigation.argId = argId;
            thisObject.eventHandler.fire(thisObject.eventNameArgSelected);
            $(thisObject.jqueryIdNewArgTextInput).val("");
        }
        
        g_debug.DisplayPhpOutputTextJsonPrefix(thisObject.debugOutputPrefixNewArg, jsonCandidateText, jsonData);
    });
}


OneTopic.prototype.OnNewArgTextInput2Changed = function()
{
    // Get the text
    var argText = $(this.jqueryIdNewArgTextInput2).val();
    
    var topicId = this.navigation.topicId;
    var topicName = this.navigation.topicName;
    
    // Set the topics in an attribute array
    var jsonPostData = {id_topic:topicId, topic_name:topicName, title:argText};
    // Create the url from the args
    //var url = this.utilsUrl.CreateUrl(g_config.m_addArgPhp, jsonPostData);
    
    // m_addArgPhp is the url to add a new argument. Send to server.
    var thisObject = this;
    // Send by POST
    g_debug.DisplayPostRequestPrefix(this.debugOutputPrefixNewArg, g_config.m_addArgPhp, jsonPostData);
    $.post(g_config.m_addArgPhp, jsonPostData, function(jsonCandidateText)
    //g_debug.DisplayPhpRequestUrlPrefix(this.debugOutputPrefixNewArg, url);
    //$.get(url, function(jsonCandidateText)
    {
        // Parse JSON
        var jsonData = g_debug.ParseJSON(jsonCandidateText);
        
        if (jsonData != null)
        {
            // Create the url of the new argument
            var argId = jsonData[thisObject.fieldNameArgumentId];
            thisObject.navigation.argId = argId;
            thisObject.eventHandler.fire(thisObject.eventNameArgSelected);
            $(thisObject.jqueryIdNewArgTextInput2).val("");
        }
        
        g_debug.DisplayPhpOutputTextJsonPrefix(thisObject.debugOutputPrefixNewArg, jsonCandidateText, jsonData);
    });
}


OneTopic.prototype.OnNewArgCancelClicked = function()
{
    $(this.jqueryIdNewArgTextVisibility).slideUp();
}

                     

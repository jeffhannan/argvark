g_config = new Config(); // Global config
g_page = new TopicArgPage(); // Page variable
g_debug = new UtilsDebug(); // Global debug output

$(document).ready(function()
{
    g_page.InitPage();
    g_page.BindPage();
    g_page.LoadPage();
});


    // http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

    // 
    // Constructor
    // 
function TopicArgPage()
{
    this.eventHandler = new EventHandler();   
    this.utilsTabVisibility = new UtilsTabVisibility();
    this.navigation = new Navigation();
    this.oneTopic = new OneTopic();
    this.oneArg = new OneArg();
}
        
                                               

    // 
    // Init
    //


TopicArgPage.prototype.InitPage = function()
{
    this.navigation.Init();
    this.utilsTabVisibility.Init();
    this.oneTopic.Init(this.eventHandler, this.navigation);
    this.oneArg.Init(this.eventHandler, this.navigation);
    
    g_debug.Clear();
}


TopicArgPage.prototype.BindPage = function()
{
    // Call Bind on objects 
    this.utilsTabVisibility.Bind();
    this.oneTopic.Bind();
    this.oneArg.Bind();
    
    var thisObject = this;
    // Set up the event handlers that are handled at this level - not solely within Topic or Arg.
    // Why say selected? These events are caused by click/selection but also on entering a new arg in topics.
    // It is just this one - eventNameArgSelected, that is triggered by clicking arg in topic, and by new arg in topic
    this.eventHandler.addListener(this.oneTopic.eventNameArgSelected, function(){thisObject.OnArgInTopicSelected();});
    this.eventHandler.addListener(this.oneArg.utilsArgLinks.eventNameArgLinkClicked, function(){thisObject.OnArgLinkClicked();});
    this.eventHandler.addListener(this.oneArg.dataArgTopics.eventNameArgTopicSelected, function(){thisObject.OnArgTopicSelected();});
    this.eventHandler.addListener(this.oneTopic.utilsTopicLinks.eventNameTopicLinkClicked, function(){thisObject.OnTopicLinkClicked();});
    
    // Respond to a browser history event
    window.onpopstate = function(event){thisObject.OnPopState(event);};
    
    // bind to resize event
    window.onresize = function(event){thisObject.OnResize();};
}


    // 
    // Load
    //
    
    
TopicArgPage.prototype.LoadPage = function()
{
    this.oneTopic.Load();
    this.oneArg.Load();
}


TopicArgPage.prototype.LoadContent = function()
{
    // What about loading in the best order? i.e. load order depends on visibility
    this.oneTopic.LoadContent();
    this.oneArg.LoadContent();
}


    // 
    // Internal
    //


TopicArgPage.prototype.ParseUrlAndLoad = function()
{
    // Parse url and load content
    this.navigation.ParseUrl();
    this.utilsTabVisibility.ParseUrl();

    // What about loading in the best order? i.e. load order depends on visibility
    g_debug.Clear();
    this.LoadContent();
}


    // 
    // Event Handlers
    //


TopicArgPage.prototype.OnArgInTopicSelected = function()
{
    this.OnArgSelected(); 
    this.SelectArgInTopic();   
}

TopicArgPage.prototype.SelectArgInTopic = function()
{
    // Given how this event is generated, the arg may not be tagged with the current topic,
    // and if it is a new arg, there won't be a topic tag
    // Therefore, just supply topicId and argId, and the server will add a tag if necessary
    var topicName = this.navigation.topicName;
    var argId = this.navigation.argId;  
    this.oneArg.dataArgTopics.SelectArgInTopic(topicName, argId, this.oneArg.debugOutputPrefixSelectArgInTopic);
}

TopicArgPage.prototype.OnArgLinkClicked = function()
{
    this.OnArgSelected();  
    this.SelectArgLink();   
}

TopicArgPage.prototype.SelectArgLink = function()
{
    var relationshipId = this.navigation.argRelationshipId;
    this.oneArg.dataArgLinks.SelectArgLink(relationshipId, this.oneArg.debugOutputPrefixSelectArgLink);
}

TopicArgPage.prototype.OnArgSelected = function()
{
    // Determine url and set it as the current url in the browser history
    //var argId = this.navigation.argId;  
    //var url = g_config.m_argUrl + argId;
    var url = this.navigation.BuildUrlArgFirst();

    if (isMobile.any())
    {
        // Don't use ajax - can't get it working
        window.location = url;
    }
    else
    {
        history.pushState(null, null, url);
        // History doesn't seem to work properly
        //History.pushState(null, null, url);
        
        // Parse the current url and load content
        this.ParseUrlAndLoad();
    }    
}


TopicArgPage.prototype.OnArgTopicSelected = function()
{
    this.OnTopicSelected();  
    this.SelectArgTopic();   
}

TopicArgPage.prototype.OnTopicLinkClicked = function()
{
    this.OnTopicSelected();  
    this.SelectTopicLink();   
}

TopicArgPage.prototype.SelectArgTopic = function()
{
    var tagId = this.navigation.tagId;
    this.oneArg.dataArgTopics.SelectArgTopic(tagId, this.oneArg.debugOutputPrefixSelectArgTopic);
}

TopicArgPage.prototype.SelectTopicLink = function()
{
    var relationshipId = this.navigation.topicRelationshipId;
    this.oneTopic.dataTopicLinks.SelectTopicLink(relationshipId, this.oneTopic.debugOutputPrefixSelectTopicLink);
}

TopicArgPage.prototype.OnTopicSelected = function()
{
    // Determine url and set it as the current url in the browser history
    /*
    var topicId = this.navigation.topicId;  
    var topicName = this.navigation.topicName;  
    var url = null;
    // Prioritise topicName
    if (topicName != null)
    {
        url = g_config.m_topicNameUrl + topicName;
    }
    else
    {
        url = g_config.m_topicIdUrl + topicId;
    }
    */
    var url = this.navigation.BuildUrlTopicFirst();    
    
    if (isMobile.any())
    {
        // Don't use ajax - can't get it working
        window.location = url;
    }
    else
    {
        history.pushState(null, null, url);
        // History doesn't seem to work properly
        //History.pushState(null, null, url);
        
        // Parse the current url and load content
        this.ParseUrlAndLoad();
    }    
}


TopicArgPage.prototype.OnPopState = function(event)
{
    // No need to determine url. It has been automatically set from history.
    
    if (!isMobile.any())
    {
        // Parse the current url and load content
        this.ParseUrlAndLoad();
    }
}


TopicArgPage.prototype.OnResize = function()
{
    // Don't understand why this doesn't work - I am able to set the width in css, so what's wrong here
    var width = $("#newArgInTopicTextInput").attr("width");
    $("#newArgInTopicTextInput").attr("width", width * 0.8);
}
 


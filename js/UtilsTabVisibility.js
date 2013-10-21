    // 
    // Constructor
    // 
function UtilsTabVisibility()
{
    // This class is specific to TopicArgPage, not general-case tab visibility
    
    this.argFirst = false;
    this.topicFirst = false;
}
        
                  
    // Names 
UtilsTabVisibility.prototype.jqueryIdTabTopicGraph = "#tabTopicGraph";
UtilsTabVisibility.prototype.jqueryIdTabTopicArgs = "#tabTopicArgs";
UtilsTabVisibility.prototype.jqueryIdTabArgGraph = "#tabArgGraph";
UtilsTabVisibility.prototype.jqueryIdButtonTopicGraph = "#buttonTopicGraph";
UtilsTabVisibility.prototype.jqueryIdButtonTopicArgs = "#buttonTopicArgs";
UtilsTabVisibility.prototype.jqueryIdButtonArgGraph = "#buttonArgGraph";
UtilsTabVisibility.prototype.classSelectedTab = "selectedTab";
UtilsTabVisibility.prototype.classUnselectedTab = "unselectedTab";
                             

    // 
    // Init
    //


UtilsTabVisibility.prototype.Init = function()
{
    this.tabArray = [this.jqueryIdTabTopicGraph, this.jqueryIdTabTopicArgs, this.jqueryIdTabArgGraph];
    this.tabButtonArray = [this.jqueryIdButtonTopicGraph, this.jqueryIdButtonTopicArgs, this.jqueryIdButtonArgGraph];
    
    this.ParseUrl();
}

UtilsTabVisibility.prototype.ParseUrl = function()
{
    //var urlTopicId = this.GetVarTopicId();
    //var urlTopicName = this.GetVarTopicName();
    //var urlArgId = this.GetVarArgId();
    this.CheckVarOrder();
    var urlVars = ExtractUrlVars();
    var urlTopicId = urlVars[g_config.m_topicIdVarName];
    var urlTopicName = urlVars[g_config.m_topicNameVarName];
    var urlArgId = urlVars[g_config.m_argIdVarName];   

    var urlTopicIdNull = (urlTopicId == null);
    var urlTopicNameNull = (urlTopicName == null);
    var urlTopicNull = (urlTopicIdNull && urlTopicNameNull);
    var urlArgIdNull = (urlArgId == null);

    //if ((this.argId != null) && (this.topicId == null))
    //if (!urlArgIdNull && urlTopicNull)
    if (this.argFirst)
    {
        // An entry is specified and a topic is not specified - show entry
        this.SetTabVisibility(this.jqueryIdTabArgGraph);
    }
    else
    {
        // Otherwise, show topic graph (if both or no entry)
        this.SetTabVisibility(this.jqueryIdTabTopicGraph);
    }
}

    // Simple hardcoded function to see which comes first - arg or topic
UtilsTabVisibility.prototype.CheckVarOrder = function(varOrder)
{
    this.argFirst = false;
    this.topicFirst = false;
    
    var varOrder = ExtractUrlVarOrder();
    var noOfVars = varOrder.length;
    for (var varIndex = 0; varIndex < noOfVars; varIndex++) 
    {
        var varEntry = varOrder[varIndex];
        if (varEntry == g_config.m_argIdVarName)
        {
            this.argFirst = true;
            break;
        }
        if ((varEntry == g_config.m_topicNameVarName) || (varEntry == g_config.m_topicIdVarName))
        {
            this.topicFirst = true;
            break;
        }
    }
}

    /*
UtilsTabVisibility.prototype.GetVarTopicId = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var topicId = ExtractGetVarValue(g_config.m_topicIdVarName);
    return topicId;
}
UtilsTabVisibility.prototype.GetVarTopicName = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var topicName = ExtractGetVarValue(g_config.m_topicNameVarName);
    return topicName;
}

    // Maybe have an ArgConfig which has stuff accessible by all Arg users (Will DataArg do?)
UtilsTabVisibility.prototype.GetVarArgId = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var argId = ExtractGetVarValue(g_config.m_argIdVarName);
    return argId;
}
    */

UtilsTabVisibility.prototype.Bind = function()
{
    var thisObject = this;
    
    $(this.jqueryIdButtonTopicGraph).click(function(){thisObject.OnButtonTopicGraphClicked();});
    $(this.jqueryIdButtonTopicArgs).click(function(){thisObject.OnButtonTopicArgsClicked();});
    $(this.jqueryIdButtonArgGraph).click(function(){thisObject.OnButtonArgGraphClicked();});
}



    // 
    // Display
    //


UtilsTabVisibility.prototype.SetTabVisibility = function(selectedTabJQueryId)
{
    var thisObject = this;
    
    $.each(this.tabArray, function(index, tabJQueryId){
        var tabButtonJQueryId = thisObject.tabButtonArray[index];
        if (tabJQueryId == selectedTabJQueryId)
        {
            $(tabJQueryId).show();
            $(tabButtonJQueryId).addClass(thisObject.classSelectedTab);
            $(tabButtonJQueryId).removeClass(thisObject.classUnselectedTab);
        }
        else
        {
            $(tabJQueryId).hide();
            $(tabButtonJQueryId).addClass(thisObject.classUnselectedTab);
            $(tabButtonJQueryId).removeClass(thisObject.classSelectedTab);
        }
    });
}


    // 
    // Event Handlers
    //


UtilsTabVisibility.prototype.OnButtonTopicGraphClicked = function()
{
    this.SetTabVisibility(this.jqueryIdTabTopicGraph);
}


UtilsTabVisibility.prototype.OnButtonTopicArgsClicked = function()
{
    this.SetTabVisibility(this.jqueryIdTabTopicArgs);
}


UtilsTabVisibility.prototype.OnButtonArgGraphClicked = function()
{
    this.SetTabVisibility(this.jqueryIdTabArgGraph);
}


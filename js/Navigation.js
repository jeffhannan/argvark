// Constructor
function Navigation()
{
    this.utilsUrl = new UtilsUrl();

    this.topicId = null;
    this.topicName = null;
    this.argId = null;
    this.loadTopic = false;
    this.loadEntry = false;
    this.argPageIndex = 0;
    this.childTopicLinksPageIndex = 0;
    this.parentTopicLinksPageIndex = 0;
    this.childArgLinksPageIndex = 0;
    this.parentArgLinksPageIndex = 0;
    this.argTopicsPageIndex = 0;

    this.topicRelationshipId = null;  // this isn't a navigation thing, it is a stats thing
    this.argRelationshipId = null;  // this isn't a navigation thing, it is a stats thing
    this.tagId = null;  // this isn't a navigation thing, it is a stats thing
}


Navigation.prototype.Init = function()
{
    this.ParseUrl();
}

Navigation.prototype.SetLocationTopicId = function(topicId)
{
    this.topicId = topicId;
}

Navigation.prototype.SetLocationArgId = function(argId)
{
    this.argId = argId;
}

    // This will get called on page load and any subsequent content loads from the url - selection or back/forward
Navigation.prototype.ParseUrl = function()
{
    // Extract values from the url 
    var urlTopicId = this.GetVarTopicId();
    var urlTopicName = this.GetVarTopicName();
    var urlArgId = this.GetVarArgId();
    
    var urlTopicIdNull = (urlTopicId == null);
    var urlTopicNameNull = (urlTopicName == null);
    var urlTopicNull = (urlTopicIdNull && urlTopicNameNull);
    var urlArgIdNull = (urlArgId == null);
    
    // Note if loading the root url. Need to make sure it loads the root, if it is returned to by History. 
    var atRoot = urlTopicNull && urlArgIdNull;
    
    // Navigation - focus purely on what is/should be loaded, not what is visible (see utilsTabVisibility for that) 
    if (!urlTopicNull)
    {
        this.loadTopic = true;
        this.topicName = null;
        this.topicId = null;
        // Potentially, both id and name could be set, and not consistently. Prioritise name.
        if (!urlTopicNameNull)
        {
            this.topicName = urlTopicName;
        }
        else
        {
            this.topicId = urlTopicId;
        }
    }
    else
    {
        // There must always be a topic loaded
        //if ((this.topicId == null) || atRoot)
        if (atRoot)
        {
            // If nothing specified, or it is the root, load the default topic.
            this.loadTopic = true;
            //this.topicId = this.GetDefaultTopicId();
            this.topicName = g_config.m_rootTopicName;
        }
        // else, just leave this.topicId unchanged
    }
    if (!urlArgIdNull)
    {
        // Valid entry, therefore load it. If nothing specified, don't load anything.
        this.loadEntry = true;
        this.argId = urlArgId;
    }
    else
    {
        // There does not need to be an entry loaded
        // Therefore, just leave this.argId unchanged
    }
    this.argPageIndex = 0;
    this.childTopicLinksPageIndex = 0;
    this.parentTopicLinksPageIndex = 0;
    this.childArgLinksPageIndex = 0;
    this.parentArgLinksPageIndex = 0;
    this.argTopicsPageIndex = 0;
}

Navigation.prototype.AddTopicVar = function(urlVarArray)
{
    // Prioritise topicName
    if (this.topicName != null)
    {
        urlVarArray[g_config.m_topicNameVarName] = this.topicName;
    }
    else
    {
        urlVarArray[g_config.m_topicIdVarName] = this.topicId;
    }
    
    return urlVarArray;
}

Navigation.prototype.AddArgVar = function(urlVarArray)
{
    if (this.argId != null)
    {
        urlVarArray[g_config.m_argIdVarName] = this.argId;
    }
    
    return urlVarArray;
}

Navigation.prototype.BuildUrlTopicFirst = function()
{
    // Add navigation vars if valid, then build a url for the site from the var array.
    // Create an object, rather than an actual array.
    var urlVarArray = {};
    
    urlVarArray = this.AddTopicVar(urlVarArray);
    urlVarArray = this.AddArgVar(urlVarArray);
    
    // Create the url from the vars
    var url = this.utilsUrl.CreateUrl(g_config.m_siteUrl, urlVarArray);
    
    return url;
}

Navigation.prototype.BuildUrlArgFirst = function()
{
    // Add navigation vars if valid, then build a url for the site from the var array.
    // Create an object, rather than an actual array.
    var urlVarArray = {};
    
    urlVarArray = this.AddArgVar(urlVarArray);
    urlVarArray = this.AddTopicVar(urlVarArray);
    
    // Create the url from the vars
    var url = this.utilsUrl.CreateUrl(g_config.m_siteUrl, urlVarArray);
    
    return url;
}

Navigation.prototype.GetVarTopicId = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var topicId = ExtractGetVarValue(g_config.m_topicIdVarName);
    return topicId;
}
Navigation.prototype.GetVarTopicName = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var topicName = ExtractGetVarValue(g_config.m_topicNameVarName);
    return topicName;
}

    // Maybe have an ArgConfig which has stuff accessible by all Arg users (Will DataArg do?)
Navigation.prototype.GetVarArgId = function()
{
    // Get the current topic value from the url (could possibly set this on load)
    var argId = ExtractGetVarValue(g_config.m_argIdVarName);
    return argId;
}

Navigation.prototype.GetDefaultTopicId = function()
{
    return g_config.m_rootTopicId;
}

Navigation.prototype.GetDefaultArgId = function()
{
    return g_config.m_rootArgId;
}


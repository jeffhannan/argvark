<?php
// Jeff Hannan

 
// This takes a keyword list in the form of an array and a string. Plus whether parent or child is being searched for.
// It returns a potentially expanded array, because the keywords found are added to it (which currently does result in duplication)
function tabletopichierarchy_get_topic_search_list_array($topic_search_list_array, $topic_search_list_string, $relation_where, $relation_select)
{
    $topic_result_list_array = array();
    $topic_count = 0;
    $search_list_array_size = count($topic_search_list_array);
    
    // Guard against SQL query error
    if ($search_list_array_size > 0)
    {
        list($success, $error_message, 
            $result_select) = tabletopichierarchy_multi_select_relations($topic_search_list_string, $relation_where, $relation_select);
      
        if ($success){ list(
            // Extract the topic id from the record
            $id_topic) = tabletopics_extract_topic_id($result_select);
            
            // Copy into array
            $topic_result_list_array[$topic_count] = $id_topic;
            $topic_count++;
        }
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_get_topic_search_list_array"); }    
    
    return array($success, $error_message, $topic_result_list_array, $topic_count);
}
                           
// This does a single level search for a keyword's parents or children, depending on which is requested.
// It takes an array of keywords, so it can do it for multiple (i.e. this allows it to do a 2 level search) hence it searches IN list, rather than keyword = 'keyword'
function tabletopichierarchy_create_topic_list($topic_search_list_array, $relation_select, $relation_where)
{
    $topic_search_list_string = utils_get_string_from_quoted_values_array($topic_search_list_array);
  
    list($success, $error_message, 
        $topic_result_list_array, $count) = tabletopichierarchy_get_topic_search_list_array($topic_search_list_array, $topic_search_list_string, $relation_where, $relation_select);

    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_create_topic_list"); }    
    
    return array($success, $error_message, $topic_result_list_array, $count);
}


function tabletopichierarchy_create_recursive_topic_list($topic_to_use, $relation_select, $relation_where)
{
     // Search array - initialised to $topicsSelected
    $topic_search_list_array = array(); 
    $topic_search_list_array[0] = $topic_to_use;
    // First count is 1 - use count to loop because otherwise I'm not sure how to build the string
    $old_entry_count = -1;
    $new_entry_count = 0;
   
   // Set a depth to avoid infinite loop
    $depth_remaining = 100; 
    while (($old_entry_count != $new_entry_count) && ($depth_remaining > 0))
    {
        $old_entry_count = $new_entry_count;
        
        list($success, $error_message, 
            $topic_result_list_array, $new_entry_count) = tabletopichierarchy_create_topic_list($topic_search_list_array, $relation_select, $relation_where);
        
        if (!$success){
            break;
        }
            
        // Create a new search list by merging the result list onto it
        $topic_search_list_array = array_merge($topic_search_list_array, $topic_result_list_array);
        $sizeoftopicSearchListArray = count($topic_search_list_array);
      
        // Update the loop variables
        $depth_remaining--;
    }

    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_create_recursive_topic_list"); }    
    
    return array($success, $error_message, $topic_search_list_array);
}



function tabletopichierarchy_build_search_list($topic_id_value)
{
    list($success, $error_message, 
        $topic_search_list_array) = tabletopichierarchy_create_recursive_topic_list($topic_id_value, 'id_child', 'id_parent');
    
    if ($success){
        $topic_search_list_array_unique = array_unique($topic_search_list_array);
        $topic_search_list_string = utils_get_string_from_quoted_values_array($topic_search_list_array_unique);
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_build_search_list"); }    
    
    return array($success, $error_message, $topic_search_list_string);
}


?> 

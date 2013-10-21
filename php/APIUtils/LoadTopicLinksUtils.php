<?php
// Jeff Hannan

function loadtopiclinks_check_vars()
{
    $error_message = null;
    
    list ($topic_id_is_set, $topic_id_value) = utils_get_var_numeric("id_topic");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_get_var_string("topic_name");
    list ($direction_is_set, $direction_value) = utils_get_var_numeric("link_direction");

    // Check vars  - page is currently optional
    $success = (($topic_id_is_set || !$topic_name_is_empty) && $direction_is_set);
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $topic_id_is_set, $topic_id_value, $topic_name_value, $direction_value);
}


function loadtopiclinks_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load)
{                      
    $output_array = array();
    $array_records = array();
    $array_fields = array();
    
    $record_index = 0;
    while($row = mysql_fetch_array($result_select)){
        
        // Fields
        $array_fields['id_relationship'] = $row['id_relationship'];
        $array_fields['id_parent'] = $row['id_parent'];
        $array_fields['id_child'] = $row['id_child'];
        $array_fields['name'] = $row['name'];
        
        // Records
        $array_records[$record_index] = $array_fields;
        $record_index++;
        
        // Only write out $no_of_entries_in_page
        if ($record_index >= $no_of_entries_in_page){
            break;
        }
    }
    // Add to $output_array 2 entries 
    $output_array['array_records'] = $array_records;
    // A flag for more pages. There are more pages if the query managed to load the extra record requested.
    $output_array['more'] = (mysql_num_rows($result_select) == $no_of_entries_to_load);
     
    // There may be 0 or more records
    $json = json_encode($output_array);
    
    return array($json);    
}


?> 

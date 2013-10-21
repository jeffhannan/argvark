<?php
// Jeff Hannan


function tablearghierarchy_select_all()
{
    $query = "SELECT * ".
        "FROM tablearghierarchy ";
        
    return sql_submit_query($query, "tablearghierarchy_select_all");
}

// Would only expect 1 row if keyword found
function tablearghierarchy_select($id_parent, $id_child)
{
    $query = "SELECT * ".
        "FROM tablearghierarchy ".
        "WHERE id_parent = '$id_parent' ".
        "AND id_child = '$id_child' ";
        
    return sql_submit_query($query, "tablearghierarchy_select");
}


function tablearghierarchy_select_by_id($id_relationship)
{
    $query = "SELECT * ".
        "FROM tablearghierarchy ".
        "WHERE id_relationship = $id_relationship ";
        
    return sql_submit_query($query, "tablearghierarchy_select_by_id");
}


function tablearghierarchy_select_by_child_id($id_child)
{
    $query = "SELECT * ".
        "FROM tablearghierarchy ".
        "WHERE id_child = '$id_child' ";
        
    return sql_submit_query($query, "tablearghierarchy_select_by_child_id");
}


function tablearghierarchy_select_by_parent_id($id_parent)
{
    $query = "SELECT * ".
        "FROM tablearghierarchy ".
        "WHERE id_parent = '$id_parent' ";
        
    return sql_submit_query($query, "tablearghierarchy_select_by_parent_id");
}


function tablearghierarchy_insert($id_parent, $id_child)
{
    $query = "INSERT INTO tablearghierarchy (id_parent, id_child) ".
        "VALUES ('$id_parent', '$id_child') ";
    
    return sql_submit_query($query, "tablearghierarchy_insert");
}


function tablearghierarchy_delete_by_id($id_relationship)
{
    $query = "DELETE ".
        "FROM tablearghierarchy ".
        "WHERE id_relationship = '$id_relationship' ";
    
    return sql_submit_query($query, "tablearghierarchy_delete_by_id");
}

function tablearghierarchy_selection_count_increment($id_relationship)
{
    $query = "UPDATE tablearghierarchy ".
        "SET selection_count = selection_count + 1 ".
        "WHERE id_relationship = '$id_relationship' ";
    
    return sql_submit_query($query, "tablearghierarchy_selection_count_increment");
}
?> 

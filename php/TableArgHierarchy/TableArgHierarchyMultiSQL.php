<?php
// Jeff Hannan

include_once("Common/Common.php");


function tablearghierarchy_multi_select_relation_order_limit($id_argument, $relationWhere, $relationSelect, $start, $number)
{
    // Wrap in order to limit the result
    $query = "SELECT * FROM ( ".
                "SELECT * ".
                "FROM tablearghierarchy AS H, tablearguments AS A ".
                "WHERE H.$relationWhere = '$id_argument' ".
                "AND H.$relationSelect = A.id_argument ".
                "ORDER BY H.selection_count DESC ".
            // Limit the result
            ") HA LIMIT $start, $number";
        
    return sql_submit_query($query, "tablearghierarchy_multi_select_relation_order_limit");
}

                           

?> 

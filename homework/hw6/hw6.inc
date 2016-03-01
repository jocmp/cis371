<?php

    function get_fortune_companies() {
        $response = file_get_contents('http://www.cis.gvsu.edu/~scrippsj/cs371/hw/fortune500.json');
        $companies = json_decode($response);
        return $companies->result;
    }

    function xml_encode($array) {
        $dom = new DOMDocument('1.0', 'utf-8');
        foreach($array as $company) {
            $dom->appendChild(dom->createElement("company"));
        }
        return $dom;
    }
?>

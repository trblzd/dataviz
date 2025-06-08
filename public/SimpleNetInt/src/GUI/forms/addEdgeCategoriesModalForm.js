/**
    * Invoked when the user clicks the submit button in the Edge Kinds textbox
    * @param {*} evt 
    */
getTextBoxContent = function (evt) {
    // Add checkboxes to Filters list B in the DOM
    DOM.createCheckboxFor(DOM.textboxes.edgeKinds.value, DOM.lists.filtersB);
    // Initialize the list of Edge Menu contextual GUI. Contextual menu created in ContextualGUI.init()
    ContextualGUI.init(DOM.textboxes.edgeKinds.value);
    // Add checkboxes to Space Menu contextual GUI. Contextual menu created in ContextualGUI.init()
    for (const cluster of ClusterFactory.clusters) {
        let transformerTemp = TransFactory.getTransformerByVClusterID(cluster.id);
        ContextualGUI.spacesMenu.addBoolean(cluster.label, false, (val) => { transformerTemp.setActive(val) });
    }
    // Create color dictionary for connectors
    ColorFactory.makeDictionary(DOM.textboxes.edgeKinds.value, ColorFactory.getPalette(1), 'connectors')
}

//Prevent focus on modal close
document.addEventListener('DOMContentLoaded', function () {
    $("#addKindModal").on('hide.bs.modal', function () {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    });
})
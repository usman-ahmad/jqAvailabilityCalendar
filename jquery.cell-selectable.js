(function ($) {

    $.fn.cellSelectable = function (options) {

        var settings = $.extend( {
            selectionClass: 'current-selection',
            disabledClass: 'disabled-selection'
        }, options);

        cellsSelector = this;

        return this.each(function () {
            var $this = $(this);
            $(document).bind('mouseup.cellSelection', documentMouseUp);
            $(this)
                .bind('mousedown.cellSelection', selectionMouseDown)
                .bind('mouseover.cellSelection', selectionMouseOver)
                .bind('selectstart.cellSelection', returnFalse);
        });

        var onSelection = false;
        var startCell = 0, endCell = 0;
        //var cellsSelector = "#our_table td";
        var cellsSelector = null;

        function selectionMouseDown(e) {
            if (isRightClick(e)) {
                return false;
            } else {
                onSelection = true;
                startCell = endCell = $(cellsSelector).index($(this));
                resetSelection(cellsSelector, settings.selectionClass, settings.disabledClass);
                return false; // prevent text selection
            }
        }

        function selectionMouseOver(e) {
            if (onSelection) {
                endCell = $(cellsSelector).index($(this));
                resetSelection(cellsSelector, settings.selectionClass, settings.disabledClass);
            }
        }

        function documentMouseUp(e) {
            onSelection = false;
        }

        function returnFalse() {
            return false;
        }

        function resetSelection(cellsSelector, selectionClass, disabledClass) {
            $(cellsSelector).removeClass(selectionClass);
            if (endCell + 1 < startCell) { // reverse select
                $(cellsSelector).slice(endCell, startCell + 1).addClass(selectionClass);
            } else {
                $(cellsSelector).slice(startCell, endCell + 1).addClass(selectionClass);
            }
            $(cellsSelector).filter('.'+disabledClass).removeClass(selectionClass);
        }

        function isRightClick(e) {
            if (e.which) {
                return (e.which == 3);
            } else if (e.button) {
                return (e.button == 2);
            }
            return false;
        }

    };

})(jQuery);

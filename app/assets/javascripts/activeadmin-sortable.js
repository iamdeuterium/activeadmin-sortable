(function ($) {
    $(document).ready(function () {
        $('.handle').closest('tbody').activeAdminSortable();
    });

    $.fn.activeAdminSortable = function () {
        this.sortable({
            helper: function (e, tr) {
                var originals = tr.children();
                var helper = tr.clone();
                helper.children().each(function (index) {
                    $(this).width(originals.eq(index).width());
                });
                return helper;
            },
            handle: ".handle",
            axis: "y",
            placeholder: "ui-state-highlight",
            update: function (event, ui) {
                $.ajax({
                    url: ui.item.find('[data-sort-url]').data('sort-url'),
                    type: 'post',
                    data: { position: ui.item.index() + 1 },
                    success: function () {
                        window.location.reload()
                    }
                });
            }
        });

        this.disableSelection();
    }
})(jQuery);

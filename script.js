$(document).ready(function() {
    var tabs = [];
    var currentTab = 0;

    // Function to add a new tab
    function addTab() {
        var tabId = tabs.length;
        $('#tabs').append('<div class="tab" id="tab' + tabId + '">New Tab <input type="text" style="padding: 8px; border: 1px solid #ccc; border-radius: 5px; margin-right: 5px;" placeholder="Enter URL" class="url-input" placeholder="Enter URL"><span class="tab-close" style="cursor: pointer; color: red;">x</span></div>');
        $('#tab' + tabId).click(function() {
            switchTab(tabId);
        });
        $('.tab-close').click(function(event) {
            event.stopPropagation();
            var tabIdToRemove = $(this).parent().attr('id').replace('tab', '');
            closeTab(tabIdToRemove);
        });
        tabs.push('');
        switchTab(tabId);
    }

    // Function to switch to a tab
    function switchTab(tabId) {
        currentTab = tabId;
        var url = tabs[tabId];
        $('#tab-content iframe').attr('src', url);
    }

    // Function to close a tab
    function closeTab(tabId) {
        $('#tab' + tabId).remove();
        tabs.splice(tabId, 1);
        if (currentTab === tabId) {
            currentTab = Math.min(tabs.length - 1, currentTab);
            switchTab(currentTab);
        }
    }

    // Event listener for adding a new tab
    $('#add-tab').click(function() {
        addTab();
    });

    // Event listener for URL input
    $(document).on('keypress', '.url-input', function(event) {
        if (event.which === 13) {
            var url = $(this).val();
            tabs[currentTab] = url;
            switchTab(currentTab);
        }
    });

    // Initial tab
    addTab();
});




const addTeaFloatingBtn = () => {
    return btn = $(`
        <button id="tea-floating-btn" class="floating-btn" data-toggle="modal" data-target="#exampleModal">Tea Code</button>
    `);
}

const addMethodFloatingBtn = () => {
    return btn = $(`
        <button id="method-floating-btn" class="floating-btn" data-toggle="modal" data-target="#exampleModal">Method Section</button>
    `);
}

const addTeaModal = (body) => {
    const modal = $(`
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style="word-wrap: break-word;">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    `);

    modal.on("show.bs.modal", function(event) {
        const button = $(event.relatedTarget);
        const btn_id = button.attr("id");

        const modal = $(this);
        if (btn_id === "tea-floating-btn") {
            modal.find('.modal-title').html("Tea Code");
            modal.find('.modal-body').html(`<code>${stringifyTeaCode()}</code>`).css("white-space", "pre");
        } else if(btn_id === "method-floating-btn") {
            modal.find('.modal-title').html("Method Section");
            modal.find('.modal-body').html(`<div contenteditable="true">${stringifyMethodSection()}</div>`).css("white-space", "normal");
        }
    })

    body.append(modal);
}
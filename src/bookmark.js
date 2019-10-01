import $ from 'jquery';
import api from './api'

const htmlFormInput = `
    <form id='form-url'>
        <fieldset>
            <div>
                <label for="title-add">Insert Title</label>
                <input type='text' class='title-add' name='title-add' required>
            </div>
            <div>
                <label for="url-add">Insert URL</label>
                <input type='url' class='url-add' name='url-add' required>
            </div>
            <div>
                <label for="descr-add">Short Description</label>
                <input type='text' class='descr-add' name='descr-add' required>
            </div>
            <div>
                <label for="num-add"></label>
                <input type='number' class='num-add' name='num-add' placeholder='1-5' required>
            </div>
            <div>
                <button type='submit' class='submit-button'>Add Bookmark</button>
            </div>
        </fieldset>
    </form>
`;
$('.button-options').on('click','.add-form', e => {
    e.preventDefault();
    $('.form-input').html(htmlFormInput);
});

$('#form-url').submit('.submit-button', e => {
    e.preventDefault();
    let title = $('.title-add').val();
    let url = $('.url-add').val();
    let descr = $('.descr-add').val();
    let rate = $('.num-add').val();
    api.createBookmark(title,url,descr,rate);
    console.log('this is also running');
})


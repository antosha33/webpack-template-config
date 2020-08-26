import * as $ from 'jquery';

function createAnalytics(){
  let counter = 0;
  let isDestroeyd = false;

  const click = () => {
    counter++;
  }

  $(document).on('click', click);

  return{
    destroyAnalytics(){
      $(document).off('click', click);
      isDestroeyd = true
    },
    getAnalytics(){
      if(isDestroeyd)return 'Already Destroyed';
      return counter;
    }
  }
}

window.analytics = createAnalytics();
import {config, createLocalVue, shallowMount} from '@vue/test-utils'
import playersList from '@/pages/playersList'
import {actions, getters, mutations, state} from '@/store/db';
import Vuex from 'vuex'

config.mocks['$i18n'] = {
  locale: 'en'
};
config.methods.$t = key => key;

config.showDeprecationWarnings = false

actions.getPlayers = () => []

const storeConfig = {
  modules:
  {
    db:
    {
      namespaced: true,
      getters,
      state,
      actions,
      mutations
    }
  }
}

describe('playersList component', () => {
  let localVue = createLocalVue()
  let store
  let input
  
  localVue.use(Vuex)
  
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    
    store = new Vuex.Store(storeConfig)
    input = {
      localVue,
      store,
      mocks: {
        $i18n: {
          locale: 'en'
        },
        $store: store
      }
    }
  })
  
  it('playersList is a Vue instance', () => {
    const wrapper = shallowMount(playersList, input);
    
    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });
  
  it('find players', () => {
    const messi = {'_id': 'a123', 'name': 'Messi', 'club': 'Barcelona'}
    const ronaldo = {'_id': 'b123', 'name': 'Ronaldo', 'club': 'Juventus'}
    const mocked_players = [
      messi,
      ronaldo
    ]
    storeConfig.modules.db.state = {
      players:
        mocked_players
    }
    store = new Vuex.Store(storeConfig)
    input.store = store
    
    const wrapper = shallowMount(playersList, input);
    wrapper.vm.search = 'M'
    expect(wrapper.vm.filterPlayers()).toStrictEqual([messi])
  })
})

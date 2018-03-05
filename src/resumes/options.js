import yaml from 'js-yaml';
import {
  PERSON
} from '../../resume/data.yml';
import {
  terms
} from '../terms';

// Called by templates to decrease redundancy
function getVueOptions (name) {
  let opt = {
    name: name,
    data () {
      return {
        person: yaml.load(PERSON),
        terms: terms,
        isMounted: false
      };
    },
    computed: {
      lang () {
        const defaultLang = this.terms.en;
        const useLang = this.terms[this.person.lang];

        // overwrite non-set fields with default lang
        Object.keys(defaultLang)
          .filter(k => !useLang[k])
          .forEach(k => {
            console.log(k);
            useLang[k] = defaultLang[k];
          });

        return useLang;
      },

      titleSpanClass () {
        if (!this.isMounted) return {};

        const titleH2Height = this.$refs.title_h2.clientHeight;
        const halfTitleH2Height = titleH2Height / 2;
        const selfHeight = this.$refs.title_span.clientHeight;

        // Resize height of Dom of class:title
        const titleDomHeight = this.$refs.title.clientHeight - (halfTitleH2Height + selfHeight);
        this.$refs.title.style.height = `${titleDomHeight}px`;

        return {
          position: 'relative',
          top: `-${halfTitleH2Height + selfHeight}px`
        };
      }
    },
    mounted () {
      this.isMounted = true;
    }
  };
  return opt;
}

export {
  getVueOptions
};

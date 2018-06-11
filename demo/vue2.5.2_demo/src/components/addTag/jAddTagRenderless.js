export default {
  name: 'renderlessAddTag',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    initLength: {
      type: Number,
      default: 3
    },
    minLength: {
      type: Number,
      default: 2
    },
    maxLength: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      newTag: '',
      oldTag: ''
    }
  },
  methods: {
    addTag() {
      let newTag = this.newTag.trim()
      let tag = newTag || this.oldTag
      this.$emit('validate', tag)
      if (tag.length === 0 || this.value.includes(tag)) {
        return
      }
      if (this.value.length === this.initLength) {
        return
      }
      if (tag.length < this.minLength || tag.length > this.maxLength) {
        return
      }
      this.oldTag = newTag
      this.$emit('input', [...this.value, tag])
      this.newTag = ''
    },
    removeTag(tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    }
  },
  render(h) {
    // eslint-disable-line
    return this.$scopedSlots.default({
      tags: this.value,
      removeTag: this.removeTag,
      addTag: this.addTag,
      inputAttrs: {
        value: this.newTag
      },
      inputEvents: {
        input: e => {
          this.newTag = e.target.value
          this.oldTag = this.newTag
          this.$emit('validate', this.newTag)
        },
        keydown: e => {
          if (e.keycode === 13) {
            e.preventDefault()
            this.addTag()
          }
        }
      }
    })
  }
}

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{type: 'save'}],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}],
    },
  ],
}

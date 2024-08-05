-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create original_text table
CREATE TABLE original_text (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create knowledge_card table (修改)
CREATE TABLE knowledge_card (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_text_id UUID REFERENCES original_text(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    text_ai TEXT,
    text_mark TEXT,
    text_origin TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create knowledge_card_tags table (for many-to-many relationship)
CREATE TABLE knowledge_card_tags (
    knowledge_card_id UUID REFERENCES knowledge_card(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (knowledge_card_id, tag_id)
);


-- -- Create users table
-- CREATE TABLE users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name TEXT NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create original_text table
-- CREATE TABLE original_text (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     title TEXT,
--     text TEXT,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create knowledge_card table
-- CREATE TABLE knowledge_card (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     original_text_id UUID NOT NULL REFERENCES original_text(id) ON DELETE CASCADE,
--     title TEXT NOT NULL,
--     text_ai TEXT,
--     text_mark TEXT,
--     text_origin TEXT,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create tags table
-- CREATE TABLE tags (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     title TEXT NOT NULL UNIQUE,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create knowledge_card_tags table (for many-to-many relationship)
-- CREATE TABLE knowledge_card_tags (
--     knowledge_card_id UUID REFERENCES knowledge_card(id) ON DELETE CASCADE,
--     tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
--     PRIMARY KEY (knowledge_card_id, tag_id)
-- );
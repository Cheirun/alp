# model/transformer_model.py

import torch
import torch.nn as nn

class TransformerClassifier(nn.Module):
    def __init__(self, input_dim, num_classes, embed_dim=128, num_heads=4, num_layers=2, dropout=0.1):
        super(TransformerClassifier, self).__init__()

        self.embedding = nn.Linear(input_dim, embed_dim)
        encoder_layer = nn.TransformerEncoderLayer(d_model=embed_dim, nhead=num_heads, dropout=dropout)
        self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)

        self.fc = nn.Linear(embed_dim, num_classes)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        # x shape: (batch_size, input_dim)
        x = self.embedding(x)               # → (batch_size, embed_dim)
        x = x.unsqueeze(1)                  # Add sequence length dim: (batch_size, seq_len=1, embed_dim)
        x = self.transformer_encoder(x)     # → (batch_size, 1, embed_dim)
        x = x.squeeze(1)                    # → (batch_size, embed_dim)
        x = self.dropout(x)
        x = self.fc(x)                      # → (batch_size, num_classes)
        return x
# model/transformer_model.py

# import torch
# import torch.nn as nn

# class TransformerClassifier(nn.Module):
#     def __init__(self, input_dim, num_classes, embed_dim=128, num_heads=4, num_layers=2, dropout=0.1):
#         super(TransformerClassifier, self).__init__()

#         self.embedding = nn.Linear(input_dim, embed_dim)
#         encoder_layer = nn.TransformerEncoderLayer(d_model=embed_dim, nhead=num_heads, dropout=dropout)
#         self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)

#         self.fc = nn.Linear(embed_dim, num_classes)
#         self.dropout = nn.Dropout(dropout)

#     def forward(self, x):
#         # x shape: (batch_size, input_dim)
#         x = self.embedding(x)               # → (batch_size, embed_dim)
#         x = x.unsqueeze(1)                  # Add sequence length dim: (batch_size, seq_len=1, embed_dim)
#         x = self.transformer_encoder(x)     # → (batch_size, 1, embed_dim)
#         x = x.squeeze(1)                    # → (batch_size, embed_dim)
#         x = self.dropout(x)
#         x = self.fc(x)                      # → (batch_size, num_classes)
#         return x

